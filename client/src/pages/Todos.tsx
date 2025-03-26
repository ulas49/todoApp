import React, { useEffect, useState } from 'react'
import { HeaderMegaMenu } from '../components/Header'
import { TodoCart } from '../components/TodoCart'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { UserInfo } from '../components/Header'
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Badge,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconPlus, IconX } from "@tabler/icons-react";


export interface Todo {
  title: string;
  content: string;
  tags?: string[];
}

const Todos: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const history = useNavigate()
  const [opened, { open, close }] = useDisclosure(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      tags: [] as string[],
    },
    validate: {
      title: (value) => (value.length < 3 ? "Başlık en az 3 karakter olmalı" : null),
      description: (value) => (value.length < 5 ? "Açıklama en az 5 karakter olmalı" : null),
    },
  });



  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/getUser')

      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      console.log("hatavar", error);

    }
  }


  const getAllTodos = async () => {
    try {
      const response = await axiosInstance.get('/api/todo/getAllTodos')

      if (response.data && response.data.todos) {
        setAllTodos(response.data.todos)
      }
    } catch (error) {
      console.log("An unexpected error.");

    }
  }


  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post("/api/todo/addtodo", {
        title: form.values.title,
        content: form.values.description,
        tags:form.values.tags
      });

      if (response.data && response.data.todo) {
         getAllTodos()
        form.reset()
        close()
      }
    } catch (error) {
      console.log("Todo eklenirken hata oluştu.", error);
    }
  };

  useEffect(() => {
    getUser()
    getAllTodos()
  }, [])

  console.log("tags", form.values.tags);


  const addTag = () => {
    if (tagInput.trim() !== "" && !form.values.tags.includes(tagInput.trim())) {
      form.setFieldValue("tags", [...form.values.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setFieldValue(
      "tags",
      form.values.tags.filter((tag) => tag !== tagToRemove)
    );
  };


  return (
    <div>
      <HeaderMegaMenu userInfo={userInfo} />
      <div className='  w-full flex flex-col items-center p-4 '>
        <Button onClick={open} color="blue" size="md" mb="lg">
          + Yeni Todo Ekle
        </Button>
        <div className=' grid grid-cols-4 gap-16   card-mb '> {
          allTodos.map((todo)=>(
            <TodoCart title={todo.title} content={todo.content} tags={todo.tags}/>
          
          )
          )
          }</div>

      </div>

      <Modal opened={opened} onClose={close} title="Yeni Todo Ekle" centered>
        <form onSubmit={handleAddTodo}>
          <TextInput
            label="Başlık"
            placeholder="Todo başlığını girin"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Açıklama"
            placeholder="Todo açıklamasını girin"
            minRows={3}
            {...form.getInputProps("description")}
            mt="md"
          />


          <Group mt="md">
            <TextInput
              placeholder="Tag ekle"
              value={tagInput}
              onChange={(event) => setTagInput(event.currentTarget.value)}
              rightSection={
                <ActionIcon color="blue" onClick={addTag}>
                  <IconPlus size={16} />
                </ActionIcon>
              }
            />
          </Group>

          <Group gap="xs" mt="md">
            {form.values.tags.map((tag) => (
              <Badge
                key={tag}
                color="blue"
                variant="light"
                size="lg"
                radius="md"
                rightSection={
                  <ActionIcon
                    size="xs"
                    color="red"
                    variant="transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <IconX size={12} />
                  </ActionIcon>
                }
              >
                {tag}
              </Badge>
            ))}
          </Group>


          <Button type="submit" fullWidth mt="md" color="green">
            Kaydet
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default Todos