/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'modern-store-users';
const CURRENT_USER_KEY = 'modern-store-current-user';

// Helper function to read data from localStorage
function readStorage(key, fallbackValue) {
  try {
    var storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    } else {
      return fallbackValue;
    }
  } catch (error) {
    console.log('Error reading from localStorage:', error);
    return fallbackValue;
  }
}

// Helper function to save data to localStorage
function saveStorage(key, value) {
  try {
    var jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.log('Error saving to localStorage:', error);
  }
}

// Helper function to remove data from localStorage
function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing from localStorage:', error);
  }
}

export function AuthProvider({ children }) {
  // Initialize users from localStorage or empty array
  var initialUsers = readStorage(USERS_KEY, []);
  var [users, setUsers] = useState(initialUsers);

  // Initialize current user from localStorage or null
  var initialUser = readStorage(CURRENT_USER_KEY, null);
  var [user, setUser] = useState(initialUser);

  // Save users to localStorage whenever they change
  useEffect(function () {
    saveStorage(USERS_KEY, users);
  }, [users]);

  // Save or remove current user from localStorage whenever it changes
  useEffect(function () {
    if (user) {
      saveStorage(CURRENT_USER_KEY, user);
    } else {
      removeStorage(CURRENT_USER_KEY);
    }
  }, [user]);

  // Check if user is authenticated
  var isAuthenticated = false;
  if (user !== null && user !== undefined) {
    isAuthenticated = true;
  }

  // Sign up a new user
  function signUp(userData) {
    var name = userData.name;
    var email = userData.email;
    var password = userData.password;

    // Normalize email (trim and lowercase)
    var normalizedEmail = email.trim().toLowerCase();

    // Check if user with this email already exists
    var emailExists = false;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === normalizedEmail) {
        emailExists = true;
        break;
      }
    }

    if (emailExists) {
      return { error: 'An account with this email already exists.' };
    }

    // Create new user object
    var newUser = {};
    newUser.id = generateUserId(); // Simple ID generation
    newUser.name = name.trim();
    newUser.email = normalizedEmail;
    newUser.password = password;

    // Add new user to users list
    var updatedUsers = users.concat([newUser]);
    setUsers(updatedUsers);

    // Set current user to the newly created user
    var currentUser = {};
    currentUser.id = newUser.id;
    currentUser.name = newUser.name;
    currentUser.email = newUser.email;
    setUser(currentUser);

    console.log('User signed up:', newUser.email);
    return { error: null };
  }

  // Sign in existing user
  function signIn(email, password) {
    // Normalize email
    var normalizedEmail = email.trim().toLowerCase();

    // Find user with matching email and password
    var matchingUser = null;
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.email === normalizedEmail && user.password === password) {
        matchingUser = user;
        break;
      }
    }

    if (!matchingUser) {
      console.log('Sign in failed for email:', normalizedEmail);
      return { error: 'Email or password is incorrect.' };
    }

    // Set current user
    var currentUser = {};
    currentUser.id = matchingUser.id;
    currentUser.name = matchingUser.name;
    currentUser.email = matchingUser.email;
    setUser(currentUser);

    console.log('User signed in:', matchingUser.email);
    return { error: null };
  }

  // Sign out current user
  function signOut() {
    setUser(null);
    console.log('User signed out');
  }

  // Simple function to generate user IDs
  function generateUserId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
  }

  // Create value object for context
  var contextValue = {
    user: user,
    isAuthenticated: isAuthenticated,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };
