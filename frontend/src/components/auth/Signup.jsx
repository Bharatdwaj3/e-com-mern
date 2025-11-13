// src/components/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person, Mail, Lock, Home } from '@mui/icons-material';
import {
  Box, Paper, Typography, TextField, Button,
  RadioGroup, FormControlLabel, Radio,
  InputAdornment, CircularProgress, Alert
} from '@mui/material';

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    accountType: 'customer', // ← backend values
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!userName) {
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
          accountType, // ← 'customer' or 'seller'
          password
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      navigate('/login', {
        state: { message: 'Check your email for verification code!' }
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 pt-16">
      <Paper className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
        <Typography variant="h4" className="text-center font-bold text-slate-800 mb-2">
          Create Account
        </Typography>
        <Typography variant="body2" className="text-center text-slate-600 mb-6">
          Join us and get started
        </Typography>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        <form onSubmit={onSubmit} className="space-y-5">
          <TextField
            fullWidth
            label="Username"
            name="userName"
            value={userName}
            onChange={onChange}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start"><Person className="text-slate-500" /></InputAdornment>,
            }}
            className="[&_.MuiOutlinedInput-root]:rounded-xl [&_.MuiOutlinedInput-root]:h-14"
          />

          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={onChange}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start"><Person className="text-slate-500" /></InputAdornment>,
            }}
            className="[&_.MuiOutlinedInput-root]:rounded-xl [&_.MuiOutlinedInput-root]:h-14"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start"><Mail className="text-slate-500" /></InputAdornment>,
            }}
            className="[&_.MuiOutlinedInput-root]:rounded-xl [&_.MuiOutlinedInput-root]:h-14"
          />

          <Box>
            <Typography className="mb-2 text-slate-700 font-medium">Account Type</Typography>
            <RadioGroup value={accountType} onChange={onChange} name="accountType" row>
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label={<Box className="flex items-center gap-2"><Person fontSize="small" /><span>Customer</span></Box>}
              />
              <FormControlLabel
                value="seller"
                control={<Radio />}
                label={<Box className="flex items-center gap-2"><Person fontSize="small" /><span>Seller</span></Box>}
              />
            </RadioGroup>
          </Box>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock className="text-slate-500" /></InputAdornment>,
            }}
            className="[&_.MuiOutlinedInput-root]:rounded-xl [&_.MuiOutlinedInput-root]:h-14"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onChange}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock className="text-slate-500" /></InputAdornment>,
            }}
            className="[&_.MuiOutlinedInput-root]:rounded-xl [&_.MuiOutlinedInput-root]:h-14"
          />

          <Button
            fullWidth
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl text-lg normal-case shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
          </Button>
        </form>

        <Typography className="text-center mt-6 text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-500 font-bold hover:underline">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}