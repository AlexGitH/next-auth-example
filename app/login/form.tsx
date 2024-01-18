'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    console.log({response});

    if(!response?.error){
      router.push('/');
      router.refresh(); // this is very important to update navigation links
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
      <input className="border text-black px-2 border-black" name="email" type="email" />
      <input className="border text-black px-2  border-black" name="password" type="password" />
      <button type="submit" className="border border-white">Sign In</button>
    </form>
  );
}