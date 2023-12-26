'use client'

import { Board, Project } from '@prisma/client'
import { Box, Button } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { RxCross1, RxHamburgerMenu, RxPlusCircled } from 'react-icons/rx'
import { Menu, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar'

interface Props {
  project: Project & { boards: Board[] }
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
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: '#161e2a !important',
    [`.ps-menu-button`]: {
      height: '40px',
      backgroundColor: '#161e2a !important',
      transition: 'all 0.5s'
    },
    [`.ps-menu-button:hover`]: {
      color: 'rgb(8, 145, 178)',
    }
  }
}

const ProjectSidebar = ({ project }: Props) => {
  const [collapsed, setCollapsed] = useState(false)

  const router = useRouter()
  const currentPath = usePathname()

  const { slug, boards } = project

  const createNewBoard = async () => {
    const res = await axios.post<Board>(`/api/projects/${slug}/boards`, {
      title: 'New Board'
    })
    const newBoard = res.data
    router.push(`/projects/${slug}/boards/${newBoard.id}`)
    router.refresh()
  }

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        collapsedWidth='0px'
        className='!border-t-cyan-700 border-t-2 border-r-0 pt-3'
        rootStyles={rootStyles}>
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem
            active={currentPath === `/projects/${slug}`}
            component={<Link href={`/projects/${slug}`} />}
          >
            Dashboard
          </MenuItem>
          <SubMenu label="Boards" className={`${collapsed ? 'hidden' : 'block'}`}>
            {
              boards.map(board => (
                <MenuItem
                  key={board.id}
                  component={<Link href={`/projects/${slug}/boards/${board.id}`} />}
                  className='text-sm group'>
                  <p className='flex justify-between items-center'>
                    {board.title}
                    <Button variant='soft' color='red' className="!cursor-pointer !hidden group-hover:!inline-flex">
                      <FaTrashAlt size="14px" />
                    </Button>
                  </p>
                </MenuItem>
              ))
            }
            <MenuItem className='text-xs'>
              <Box
                onClick={createNewBoard}
                className='flex justify-center items-center gap-2 text-gray-500 hover:text-gray-400 transition-all w-full p-1 border-2 border-gray-600 hover:border-gray-500 border-dashed rounded-md'>
                <RxPlusCircled size="16px" />
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