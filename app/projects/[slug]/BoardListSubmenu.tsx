import { Board, Project } from '@prisma/client'
import { AlertDialog, Box, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { RxPlusCircled } from 'react-icons/rx'
import { MenuItem, SubMenu } from 'react-pro-sidebar'

interface Props {
  project: Project & { boards: Board[] }
  isCollapsed: boolean
}

const BoardListSubmenu = ({ project, isCollapsed }: Props) => {
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

  const { slug, boards } = project

  const createNewBoard = async () => {
    const res = await axios.post<Board>(`/api/projects/${slug}/boards`, {
      title: 'New Board'
    })
    const newBoard = res.data
    router.push(`/projects/${slug}/boards/${newBoard.id}`)
    router.refresh()
  }

  const deleteBoard = async (boardId: string) => {
    try {
      setDeleting(true)
      await axios.delete(`/api/projects/${slug}/boards/${boardId}`)
      router.push(`/projects/${slug}`)
      router.refresh()
    } catch (e) {
      setDeleting(false)
      setError(true)
    }
  }

  return (
    <SubMenu label="Boards" className={isCollapsed ? 'hidden' : 'block'}>
      {
        boards.map(board => (
          <MenuItem
            key={board.id}
            component={<Link href={`/projects/${slug}/boards/${board.id}`} />}
            className='text-sm group'>
            <p className='flex justify-between items-center'>
              {board.title}
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button variant='soft' color='red' className="!cursor-pointer !hidden group-hover:!inline-flex">
                    <FaTrashAlt size="14px" />
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                  <AlertDialog.Description>
                    Are you sure you want to delete this board? This action cannot be undone.
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        color="red"
                        disabled={isDeleting}
                        onClick={(e) => deleteBoard(board.id)} >
                        Delete
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
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

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This board can not be deleted.
          </AlertDialog.Description>
          <Button variant="soft" color="gray" mt="4" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </SubMenu>
  )
}

export default BoardListSubmenu