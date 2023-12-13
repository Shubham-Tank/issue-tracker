import {
  SortableContext,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Status } from '@prisma/client';
import { Badge, Card, Separator, Text } from '@radix-ui/themes';

export interface SingleIssue {
  id: number;
  title: string;
}

interface SingleIssueCardProp {
  status: Status;
  issue: SingleIssue;
}

export interface IssueContainerProps {
  status: Status;
  label: string;
  issues: SingleIssue[];
}

const IssuesDropContainer = ({ status, label, issues }: IssueContainerProps) => {

  return (
    <Card className='w-1/3 overflow-visible'>
      <Text as='p' className='font-bold text-center'>
        {label}
      </Text>
      <Badge variant="soft" color="gray" className='text-xs ml-1 absolute right-3 top-3' radius='full'>
        {issues.length}
      </Badge>
      <Separator orientation="horizontal" size="4" mt="3" mb="5" />
      <SortableContext
        items={issues}
      >
        <ul>
          {
            issues.map(issue => <SingleIssueCard key={issue.id} status={status} issue={issue} />)
          }
        </ul>
      </SortableContext>
    </Card >
  )
}

const SingleIssueCard = ({ status, issue }: SingleIssueCardProp) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active
  } = useSortable({ id: issue.id, data: { status, issue } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: active?.id === issue.id ? 100 : 0
  };

  return (
    <Card
      className='text-sm'
      ref={setNodeRef} style={style} {...listeners} {...attributes}
      mt="4">
      <Text>{issue.title}</Text>
    </Card>
  )
}

export default IssuesDropContainer