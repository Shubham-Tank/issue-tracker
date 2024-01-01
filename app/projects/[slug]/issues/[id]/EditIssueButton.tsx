import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { RxPencil2 } from 'react-icons/rx'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Button asChild={true}>
        <Link href={`/issues/${issueId}/edit`}>
          <RxPencil2 className="w-4 h-4" />
          Edit
        </Link>
      </Button>
    </>
  )
}

export default EditIssueButton