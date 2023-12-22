'use client'

import { Board } from '@prisma/client'
import { Box } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { RxCross1, RxHamburgerMenu, RxPlusCircled } from 'react-icons/rx'
import { Menu, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar'

interface Props {
  projectSlug: string
  boards: Board[]
}

const customPurple = 'rgb(30, 41, 59)'
const customCyan = `rgb(6 182 212)`

const rootStyles = {
  borderRight: 'none',
  backgroundColor: customPurple,
  height: 'calc(100vh - 60px)',
  [`.ps-sidebar-container`]: {
    backgroundColor: customPurple,
  }
}

const menuItemStyles: MenuItemStyles = {
  button: {
    backgroundColor: customPurple,
    [`&:hover`]: {
      backgroundColor: customPurple
    },
    [`&.ps-active`]: {
      color: customCyan,
      borderLeft: `4px solid ${customCyan}`,
      borderRadius: '4px',
      // marginLeft: '4px',
      paddingLeft: '16px'
    }
  },
  subMenuContent: {
    [`.ps-menu-button`]: {
      backgroundColor: '#161e2a !important'
    },
    [`.ps-menu-button:hover`]: {
      color: 'rgb(8, 145, 178)',
    }
  }
}

const ProjectSidebar = ({ projectSlug, boards }: Props) => {
  const [collapsed, setCollapsed] = useState(false)

  const currentPath = usePathname()

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        collapsedWidth='0px'
        className='!border-t-cyan-700 border-t-2 border-r-0 pt-3'
        rootStyles={rootStyles}>
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem
            active={currentPath === `/projects/${projectSlug}`}
            component={<Link href={`/projects/${projectSlug}`} />}
          >
            Dashboard
          </MenuItem>
          <SubMenu label="Boards">
            {
              boards.map(board => (
                <MenuItem key={board.id} className='text-sm'>{board.title}</MenuItem>
              ))
            }
            <MenuItem className='text-sm'>
              <Box className='flex items-center gap-2'>
                <RxPlusCircled /> Add New Board
              </Box>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <Box className='p-2 bg-cyan-700 h-fit rounded-r-lg' onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <RxHamburgerMenu /> : <RxCross1 />}
      </Box>
    </>
  )
}

export default ProjectSidebar