import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  // Navigation hook
  var navigate = useNavigate();

  // Auth context
  var authContext = useAuth();
  var signUp = authContext.signUp;

  // Form handling
  var formMethods = useForm();
  var register = formMethods.register;
  var handleSubmit = formMethods.handleSubmit;
  var setError = formMethods.setError;
  var formState = formMethods.formState;
  var errors = formState.errors;

  // Input class styling
  var inputClass = 'mt-2 block w-full border-0 border-b border-[#c6c6cd] bg-transparent px-0 py-3 text-base outline-none focus:border-[#0058be]';

  // Form submit handler
  function submit(formData) {
    // Call signUp from auth context
    var result = signUp(formData);

    // Handle errors
    if (result.error !== null && result.error !== undefined) {
      setError('root', { message: result.error });
      return;
    }

    // Navigate to home page
    navigate('/');
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo (hidden on large screens) */}
      <Link to="/" className="text-xl font-bold tracking-tighter lg:hidden">
        MODERN_STORE
      </Link>

      {/* Page title */}
      <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
        Join us
      </h1>

      {/* Page description */}
      <p className="mt-3 text-[#45464d]">
        Create an account to elevate your shopping experience.
      </p>

      {/* Registration form */}
      <form onSubmit={handleSubmit(submit)} className="mt-10 space-y-6">
        {/* Full name field */}
        <label className="block text-xs font-bold uppercase tracking-widest text-[#45464d]">
          Full name
          <input
            {...register('name', { required: 'Name is required' })}
            className={inputClass}
          />
          {errors.name && (
            <span className="mt-1 block text-xs text-[#ba1a1a]">
              {errors.name.message}
            </span>
          )}
        </label>

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
            {...register('password', {
              required: 'Password must be at least 6 characters',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            type="password"
            className={inputClass}
          />
          {errors.password && (
            <span className="mt-1 block text-xs text-[#ba1a1a]">
              {errors.password.message}
            </span>
          )}
        </label>

        {/* Root error (for validation errors) */}
        {errors.root && (
          <p className="text-sm text-[#ba1a1a]">
            {errors.root.message}
          </p>
        )}

        {/* Submit button */}
        <button
          className="w-full bg-[#0058be] py-3 text-sm font-bold text-white hover:bg-[#2170e4]"
        >
          CREATE ACCOUNT
        </button>
      </form>

      {/* Login link */}
      <p className="mt-10 text-center text-[#45464d]">
        Already have an account?
        <Link
          to="/auth/login"
          className="text-xs font-bold uppercase tracking-wider text-[#0058be]"
        >
          Sign in instead
        </Link>
      </p>
    </div>
  );
}
