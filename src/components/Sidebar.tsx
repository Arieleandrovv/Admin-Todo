import Image from 'next/image';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPerson,
  IoPersonOutline,
} from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { LogoutButton } from './LogoutButton';

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    title: 'dashboard',
    path: '/dashboard',
  },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos',
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    path: '/dashboard/server-todos',
  },
  {
    icon: <IoListOutline />,
    title: 'Cookies',
    path: '/dashboard/cookies',
  },
  {
    icon: <IoListOutline />,
    title: 'Productos',
    path: '/dashboard/products',
  },
  {
    icon: <IoPersonOutline />,
    title: 'Perfil',
    path: '/dashboard/profile',
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('api/auth/signin');
  }
  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/dashboard'>
            <Image
              src='https://example.com/image.png'
              width={100}
              height={100}
              className='w-32'
              alt='tailus logo'
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={session?.user?.image!}
            width={100}
            height={100}
            alt=''
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {session?.user?.name}
          </h5>
          <span className='hidden text-gray-400 lg:block'>Admin</span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {menuItem.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              path={item.path}
              title={item.title}
            />
          ))}
        </ul>
      </div>

      <LogoutButton />
    </aside>
  );
};
