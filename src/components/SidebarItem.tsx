'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export default function SidebarItem({ icon, path, title }: SidebarItemProps) {
  const pathName = usePathname();
  const isActive = pathName === path;

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          isActive
            ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {icon}
        <span className='font-medium'>{title}</span>
      </Link>
    </li>
  );
}
