import {
  SortableContext,
  useSortable
} from '@dnd-kit/sortable';
import { Status } from '@prisma/client';
import { Badge, Card, Separator, Text } from '@radix-ui/themes';
import IssueCard from './IssueCard';
import { BoardIssue } from '.';
import { useMemo, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  status: Status;
  label: string;
  issues: BoardIssue[];
}

const IssuesDropContainer = ({ label, issues, status }: Props) => {

  const issuesIds = useMemo(() => {
    return issues.map(i => i.id)
  }, [issues])

  return (
    <Card className='w-1/3 min-w-[300px] max-w-sm overflow-visible'>
      <Text as='p' className='font-bold text-center'>
        {label}
      </Text>
      <Badge variant="soft" color="gray" className='text-xs ml-1 absolute right-3 top-3' radius='full'>
        {issues.length}
      </Badge>
      <Separator orientation="horizontal" size="4" mt="3" mb="5" />
      <SortableContext
        items={issuesIds}
      >
        <ul>
          {
            issues.map(issue => <IssueCard key={issue.id} issue={issue} />)
          }
        </ul>
      </SortableContext>
    </Card >
  )
}


export default IssuesDropContainer