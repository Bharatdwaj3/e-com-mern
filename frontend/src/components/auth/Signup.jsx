import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person, Mail, Lock } from '@mui/icons-material';

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    accountType: 'customer',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  navigate();

  const { userName, fullName, email, accountType, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!userName.trim()) {
      setError('Username is required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/user/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          fullName,
          email,
          accountType,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      navigate('/login', {
        state: { message: 'Check your email for verification code!' },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-900 via-purple-800 to-slate-900 flex items-center justify-center p-2">
      
      <div className="w-full max-w-md mx-auto p-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Create Account</h2>
        <p className="text-center text-slate-600 mb-6 text-sm">Join us and get started</p>

        {error && <p className="text-red-600 text-center mb-4 font-medium">✗ {error}</p>}

        <form onSubmit={onSubmit} className="space-y-5">

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Username <span className="text-red-500">*</span></label>
            <div className="relative">
              <Person className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={onChange}
                required
                placeholder="olivia.green"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <Person className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={onChange}
                required
                placeholder="Olivia Green"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="olivia.green@example.com"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Account Type</label>
            <div className="flex gap-8 justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value="customer"
                  checked={accountType === 'customer'}
                  onChange={onChange}
                  className="w-5 h-5 text-cyan-600"
                />
                <span className="text-slate-700">Customer</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value="seller"
                  checked={accountType === 'seller'}
                  onChange={onChange}
                  className="w-5 h-5 text-cyan-600"
                />
                <span className="text-slate-700">Seller</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '20px' }} />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 text-sm">
          Already have an account? <Link to="/login" className="text-cyan-500 font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}