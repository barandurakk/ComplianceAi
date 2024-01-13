import LocaleSwitcher from '@/components/LocaleSwitcher'; 
import Link from 'next/link';

export default function Layout(props: { children: React.ReactNode }) {
  
 

  return (
    <>
      <div className="py-5 text-xl [&_a:hover]:border-b-2 [&_a:hover]:border-blue-700 [&_a]:text-blue-700 [&_p]:my-6 [&_ul]:my-6">
      <LocaleSwitcher />
      <Link
      href="/sign-in/"
      className="border-none text-gray-700 hover:text-gray-900"
    >
      Sign in
    </Link>
    <Link
      href="/sign-up/"
      className="border-none text-gray-700 hover:text-gray-900"
    >
      Sign up
    </Link>
        {props.children}
      </div>
    </>
   
   
  );
}
