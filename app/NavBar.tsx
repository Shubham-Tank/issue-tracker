import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: '/' },
    { label: "Issues", href: '/issues' },
  ]

  return (
    <>
      <nav className='flex space-x-6 px-6 py-5 border-b items-center text-white bg-slate-800'>
        <Link href="/"><FaBug /></Link>
        <ul className='flex gap-6'>
          {
            links.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className='pb-2 pl-1 pr-1 border-cyan-600 rounded-lg hover:border-b-2 transition-all'>
                  {label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}

export default NavBar