'use client';

import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <span className='cursor-pointer'
      onClick={() => signOut()}
    >
      Sign out
    </span>
  );

};
