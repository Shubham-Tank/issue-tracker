import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { BoardIssue } from ".";
import { Card, Text } from "@radix-ui/themes";

const IssueCard = ({ issue }: { issue: BoardIssue }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    active
  } = useSortable({ id: issue.id, data: { issue } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: active?.id === issue.id ? 100 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      className="text-sm cursor-grab"
      ref={setNodeRef} style={style} {...listeners} {...attributes}
      mt="4">
      <Text>{issue.title}</Text>
    </Card>
  )
}

export default IssueCard