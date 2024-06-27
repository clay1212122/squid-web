'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthStore } from '../stores/Auth';
export default function SideNav() {
  const router = useRouter();
  const authStore = AuthStore();

  return (
    <div className="flex h-full flex-col px-3 py-2 md:px-">
      <Link
        className="mb-2 flex h-10 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="w-30 text-white md:w-40">
        <Image
                    alt='Hola'
                    width={220}
                    height={220}
                    className='hidden md:block'
                    src='/squid.png'
                />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form onSubmit={()=> {authStore.setLogged(false); router.push('/auth/login'); authStore.setLogged(false)}}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Cerrar Sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}
