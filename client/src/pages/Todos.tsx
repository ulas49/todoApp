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
import { ToastContainer, toast } from 'react-toastify';
import axiosInstanceFD from '../utils/axiosInstanceFD'


export interface Todo {
  _id: string,
  title: string;
  content: string;
  tags?: string[];
  imageUrl:string;
}

const Todos: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const history = useNavigate()
  const [opened, { open, close }] = useDisclosure(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);


  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      tags: [] as string[],
      _id: "",
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

  const editTodo = (todo: Todo) => {
    form.setValues({
      title: todo.title,
      description: todo.content,
      tags: todo.tags || [],
      _id: todo._id,
      
    });
    setEditingTodo(todo);
    open();
  };

  

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("title", form.values.title);
    formData.append("content", form.values.description);
    form.values.tags.forEach((tag: string) => {
      formData.append("tags[]", tag);
    });
   
   
    if (image) formData.append("image", image);


 
 
    try {
      const response = await axiosInstanceFD.post("/api/todo/addtodo", formData);

      if (response.data && response.data.todo) {
        getAllTodos()
        form.reset()
        close()
        toast.success('Başarıyla eklendi!');
      }
    } catch (error) {
      console.log("Todo eklenirken hata oluştu.", error);
    }
  };


  const handleEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.values.title);
    formData.append("content", form.values.description);
    form.values.tags.forEach((tag: string) => {
      formData.append("tags[]", tag);
    });
   

    if (image) formData.append("image", image);
    if (file) formData.append("file", file);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      if (!editingTodo) return;

      const response = await axiosInstanceFD.put(`/api/todo/editTodo/${editingTodo._id}`,formData );

      if (response.data && response.data.todo) {
        getAllTodos();
        form.reset();
        close();
        toast.success('Başarıyla güncellendi!');
      }
    } catch (error) {
      console.log("Todo güncellenirken hata oluştu.", error);
    }
  };


  const deleteTodo = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/todo/deleteTodo/${id}`);
      if (response.data && response.data.success) {
        setAllTodos(allTodos.filter((todo) => todo._id !== id));
      }
      toast.success('Başarıyla silindi!');

    } catch (error) {
      console.log("Todo silinirken hata oluştu.", error);
    }
  };

  const closeModal = () => {
    form.reset();
    setEditingTodo(null);
    close();
  };

  useEffect(() => {
    getUser()
    getAllTodos()
  }, [])



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
      <ToastContainer  autoClose={2000}/>

      <HeaderMegaMenu userInfo={userInfo} />
      <div className='  w-full flex flex-col items-center p-4 '>
        <Button onClick={open} color="blue" size="md" mb="lg">
          + Yeni Todo Ekle
        </Button>
        <div className=' grid grid-cols-4 gap-16   card-mb '> {
          allTodos.map((todo) => (
            <TodoCart title={todo.title} content={todo.content} tags={todo.tags} _id={todo._id} imageUrl={todo.imageUrl} editTodo={editTodo} deleteTodo={deleteTodo} />

          )
          )
        }</div>

      </div>

      <Modal opened={opened} onClose={closeModal} title={editingTodo ? "Todo Düzenle" : "Yeni Todo Ekle"} centered>
        <form onSubmit={editingTodo ? handleEditTodo : handleAddTodo}>
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

          <input type="file"   onChange={(e) => setImage(e.target.files && e.target.files[0])} />
          <input type="file" onChange={(e) => setFile( e.target.files && e.target.files[0])} />
          <Button type="submit" fullWidth mt="md" color="blue">
            {editingTodo ? "Güncelle" : "Kaydet"}

          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default Todos