'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'

const NavBar = () => {
  return (
    <>
      <nav className='px-6 py-4 items-center text-white bg-slate-800'>
        <Flex justify="between">
          <Flex align='center' gap="5">
            <Link href="/"><FaBug /></Link>
            <NavLinks />
          </Flex>
          <Box>
            <AuthStatus />
          </Box>
        </Flex>
      </nav >
    </>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { label: "Dashboard", href: '/' },
    { label: "Issues", href: '/issues' },
  ]

  return (
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
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return null

  if (status === 'unauthenticated') return <Link href="/api/auth/signin">Login</Link>

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius='full'
          className='cursor-pointer'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text>
            {session!.user!.email}
          </Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default NavBar