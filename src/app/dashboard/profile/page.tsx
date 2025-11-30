'use client';

import { useSession } from 'next-auth/react';

type Props = {};

export default function ProfilePage({}: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      <h1>Page profile</h1>
      <div className='flex flex-col'>
        <span>{user?.name}</span>
        <span>{user?.email}</span>
        <span>{user?.image}</span>
      </div>
    </div>
  );
}
