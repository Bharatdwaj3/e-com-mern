import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from '@mui/icons-material';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      navigate('.', { replace: true, state: {} });
    }
  }, [location, navigate]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      
      window.location.href = '/';

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-900 via-purple-800 to-slate-900 flex items-center justify-center  p-2">
      <div className="w-full max-w-md mx-auto p-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Welcome</h2>
        <p className="text-center text-slate-600 mb-6 text-sm">Sign in to your account to continue</p>

        {success && <p className="text-green-600 text-center mb-4 font-medium">✓ {success}</p>}
        {error && <p className="text-red-600 text-center mb-4 font-medium">✗ {error}</p>}

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="lena.coren02@example.net"
                required
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
            </div>
            <Link to="#" className="text-cyan-600 hover:underline text-sm" onClick={e => e.preventDefault()}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 text-sm">
          Don't have an account? <Link to="/signup" className="text-cyan-500 font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}