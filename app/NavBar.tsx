'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { label: "Dashboard", href: '/' },
    { label: "Issues", href: '/issues' },
  ]

  return (
    <>
      <nav className='flex space-x-6 px-6 py-5 items-center text-white bg-slate-800'>
        <Link href="/"><FaBug /></Link>
        <ul className='flex gap-6'>
          {
            links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={classNames({
                    'border-cyan-600 rounded-lg transition-all': true,
                    'border-b-4 p-2': href === currentPath,
                    'border-b-0 p-1': href !== currentPath
                  })}>
                  {label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav >
    </>
  )
}

export default NavBar