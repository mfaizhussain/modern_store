import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  // Navigation hook
  var navigate = useNavigate();

  // Location hook (for redirect after login)
  var location = useLocation();

  // Auth context
  var authContext = useAuth();
  var signIn = authContext.signIn;

  // Form handling
  var formMethods = useForm();
  var register = formMethods.register;
  var handleSubmit = formMethods.handleSubmit;
  var setError = formMethods.setError;
  var formState = formMethods.formState;
  var errors = formState.errors;

  // Input class styling
  var inputClass = 'mt-2 block w-full border-0 border-b border-[#c6c6cd] bg-transparent px-0 py-3 text-base outline-none focus:border-[#0058be]';

  // Determine where to redirect after login
  var destination = '/';
  if (location.state !== null && location.state !== undefined) {
    if (location.state.from !== null && location.state.from !== undefined) {
      if (location.state.from.pathname !== null && location.state.from.pathname !== undefined) {
        destination = location.state.from.pathname;
      }
    }
  }

  // Form submit handler
  function submit(formData) {
    var email = formData.email;
    var password = formData.password;

    // Call signIn from auth context
    var result = signIn(email, password);

    // Handle errors
    if (result.error !== null && result.error !== undefined) {
      setError('root', { message: result.error });
      return;
    }

    // Navigate to destination
    navigate(destination, { replace: true });
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo (hidden on large screens) */}
      <Link to="/" className="text-xl font-bold tracking-tighter lg:hidden">
        MODERN_STORE
      </Link>

      {/* Page title */}
      <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
        Welcome back
      </h1>

      {/* Page description */}
      <p className="mt-3 text-[#45464d]">
        Enter your details to access your account.
      </p>

      {/* Login form */}
      <form onSubmit={handleSubmit(submit)} className="mt-10 space-y-6">
        {/* Email field */}
        <label className="block text-xs font-bold uppercase tracking-widest text-[#45464d]">
          Email address
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className={inputClass}
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-[#ba1a1a]">
              {errors.email.message}
            </span>
          )}
        </label>

        {/* Password field */}
        <label className="block text-xs font-bold uppercase tracking-widest text-[#45464d]">
          Password
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            className={inputClass}
          />
          {errors.password && (
            <span className="mt-1 block text-xs text-[#ba1a1a]">
              {errors.password.message}
            </span>
          )}
        </label>

        {/* Root error (for auth errors) */}
        {errors.root && (
          <p className="text-sm text-[#ba1a1a]">
            {errors.root.message}
          </p>
        )}

        {/* Submit button */}
        <button
          className="w-full bg-[#0058be] py-3 text-sm font-bold text-white hover:bg-[#2170e4]"
        >
          SIGN IN
        </button>
      </form>

      {/* Register link */}
      <p className="mt-10 text-center text-[#45464d]">
        Not a member?
        <Link
          to="/auth/register"
          className="text-xs font-bold uppercase tracking-wider text-[#0058be]"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
