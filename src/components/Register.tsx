"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import FormInput from './FormInput';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    alert('Registration submitted!');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
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
        <FormInput
          label="First Name"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Last Name"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Age"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Sex"
          type="text"
          name="sex"
          value={form.sex}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4 mt-2"
        >
          Register
        </button>
      </form>
      <div className="text-center">
        <Link href="/login" className="text-blue-600 hover:underline">
          Already have an account? Sign in here.
        </Link>
      </div>
    </div>
  );
};

export default Register;
