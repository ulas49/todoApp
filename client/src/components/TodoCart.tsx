import { IconTrash  } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './BadgeCard.module.css';
import { Todo } from '../pages/Todos';
const mockdata = {
  image:
    'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  title: 'Verudela Beach',

  description:
    'Read a book',
  badges: [
    { emoji: '☀️', label: 'Sunny weather' },
    { emoji: '🦓', label: 'Onsite zoo' },
    { emoji: '🌊', label: 'Sea' },
    { emoji: '🌲', label: 'Nature' },
    { emoji: '🤽', label: 'Water sports' },
  ],
};


interface TodoCartProps extends Todo {
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}
export function TodoCart({title,content,tags,_id,imageUrl,editTodo,deleteTodo}:TodoCartProps) {
  const { image } = mockdata;
  const features = tags && tags.map((tag,idx) => (
    <Badge variant="light" key={idx} >
      {tag}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className='w-[300px]    max-h-[500px]   '>
      <Card.Section>
        <Image src={imageUrl || ""} alt="thumbnails " className='h-[200px]' />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {content}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
      <Button radius="md" style={{ flex: 1 }} onClick={() => editTodo({ _id, title, content, tags,imageUrl})}>
          Düzenle
        </Button>
        <ActionIcon variant="default" radius="md" size={36} onClick={() => deleteTodo(_id)}>
          <IconTrash stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}