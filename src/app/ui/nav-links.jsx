'use client';
import {
  UserGroupIcon,
  HomeIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Trampa libre',
    href: '/dashboard/freeTrap',
    icon: FlagIcon,
  },
  { name: 'Usuarios', href: '/dashboard/users', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-200 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 ${pathName === link.href ? 'bg-green-200 text-black' : ''}` }
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
