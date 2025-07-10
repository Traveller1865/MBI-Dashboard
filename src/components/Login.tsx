"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import FormInput from './FormInput';

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    alert('Login submitted!');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4 mt-2"
        >
          Sign In
        </button>
      </form>
      <div className="text-center">
        <Link href="/register" className="text-blue-600 hover:underline">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
