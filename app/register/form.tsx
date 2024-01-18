'use client'
import { FormEvent } from 'react';

export default function Form() {
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),

    });
    console.log({response});
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
      <input className="border text-black px-2 border-black" name="email" type="email" />
      <input className="border text-black px-2  border-black" name="password" type="password" />
      <button type="submit" className="border border-white">Register</button>
    </form>
  );
}