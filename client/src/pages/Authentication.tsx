import { useState } from 'react';
import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  import { upperFirst, useToggle } from '@mantine/hooks';
  import { GoogleButton } from '../components/GoogleButton';
  import { TwitterButton } from '../components/TwitterButton';
  import todoIllustraton  from '../assets/todoIllustration.jpg';
  import axiosInstance from '../utils/axiosInstance'
  import { useNavigate } from 'react-router-dom';

  export function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const history = useNavigate()
    const form = useForm({
      initialValues: {
        email: '',
        name: '',
        surname:'',
        password: '',
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()

      if(type==="login"){

        try {
          const response = await axiosInstance.post('/api/auth/login',{
            email:form.values.email,
            password:form.values.password
          })
          if(response.data && response.data.accessToken){
            localStorage.setItem("token",response.data.accessToken)
            history("/")

          }
        } catch (error) {
         console.log(error);
         
        }
      }

      if(type==="register"){

        try {
          const response = await axiosInstance.post('/api/auth/register',{
            email:form.values.email,
            password:form.values.password,
            name:form.values.name,
            surname:form.values.surname
          })
 
          if(response.data && response.data.accessToken){
            localStorage.setItem("token",response.data.accessToken)
            history("/")

          }
        } catch (error:any) {
          const backendErrors: Record<string, string> = {};
          error.response.data.errors.forEach((err: { field: string; message: string }) => {
            backendErrors[err.field] = err.message;
          });
          form.setErrors(backendErrors);
        }
      }



    }
   
    return (
     <div className='flex items-center justify-evenly h-[900px] md:flex-row flex-col  '>
        <div className='w-[500px] md:w-[600px]'>  <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to To-Do App, {type} with
        </Text>
  
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl"> <span ></span>Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>
  
        <Divider label="Or continue with email" labelPosition="center" my="lg" />
  
        <form onSubmit={handleSubmit}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
                error={form.errors.name}
              />
            )}

            {type === 'register' && (
              <TextInput
                label="Surname"
                placeholder="Your surname"
                value={form.values.surname}
                onChange={(event) => form.setFieldValue('surname', event.currentTarget.value)}
                radius="md"
                error={form.errors.surname}
              />
            )}
  
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
  
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
  

          </Stack>
  
          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper></div>
       
      <img src={todoIllustraton} alt=""  className='w-[400px] sm:w-[500px] md:w-[600px]'/>

     </div>
     
    );
  }