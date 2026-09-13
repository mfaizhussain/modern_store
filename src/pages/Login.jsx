import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const input = 'mt-2 block w-full border-0 border-b border-[#c6c6cd] bg-transparent px-0 py-3 text-base outline-none focus:border-[#0058be]';
  const destination = location.state?.from?.pathname || '/';
  const submit = ({ email, password }) => {
    const result = signIn(email, password);
    if (result.error) {
      setError('root', { message: result.error });
      return;
    }
    navigate(destination, { replace: true });
  };
  return <div className="w-full max-w-sm"><Link to="/" className="text-xl font-bold tracking-tighter lg:hidden">MODERN_STORE</Link><h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">Welcome back</h1><p className="mt-3 text-[#45464d]">Enter your details to access your account.</p><form onSubmit={handleSubmit(submit)} className="mt-10 space-y-6"><label className="block text-xs font-bold uppercase tracking-widest text-[#45464d]">Email address<input {...register('email', { required: 'Email is required' })} type="email" className={input} />{errors.email && <span className="mt-1 block text-xs text-[#ba1a1a]">{errors.email.message}</span>}</label><label className="block text-xs font-bold uppercase tracking-widest text-[#45464d]">Password<input {...register('password', { required: 'Password is required' })} type="password" className={input} />{errors.password && <span className="mt-1 block text-xs text-[#ba1a1a]">{errors.password.message}</span>}</label>{errors.root && <p className="text-sm text-[#ba1a1a]">{errors.root.message}</p>}<button className="w-full bg-[#0058be] py-3 text-sm font-bold text-white hover:bg-[#2170e4]">SIGN IN</button></form><p className="mt-10 text-center text-[#45464d]">Not a member? <Link to="/auth/register" className="text-xs font-bold uppercase tracking-wider text-[#0058be]">Create an account</Link></p></div>;
}
