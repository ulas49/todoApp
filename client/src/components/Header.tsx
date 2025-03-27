import { useState } from 'react';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  useMantineTheme,
  Autocomplete
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import gif from '../assets/1.gif'

 export interface UserInfo {
  name:string,
  surname:string,
  email:string,
  _id:string
}

interface UserProps {
  userInfo:UserInfo | null
  onSearchTodo:(query:string)=>void
}

export function HeaderMegaMenu({userInfo,onSearchTodo}:UserProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [searchQuery,setSearchQuery]=useState<string>('')
  const history = useNavigate()


const handleSearch = ()=>{
  if(searchQuery){

    onSearchTodo(searchQuery)
  }
}


const onLogout = ()=>{
  localStorage.clear()
  history('/login')
}


  return (
    <Box pb={30}>
      <header className={classes.header}>
        <Group justify="space-around"  h="100%">
      
            <img src={gif} alt="LOGO"  className='w-22 sm:w-28 md:w-36 lg:w-42 h-auto'/>
           <SearchBar value={searchQuery} onChange={({target})=>{
            setSearchQuery(target.value)
           }}
           handleSearch={handleSearch}
          />
          <Group visibleFrom="sm">
            <p className='text-sm font-medium'>{userInfo && userInfo.name} {userInfo && userInfo.surname} </p>
            <Button variant="default" onClick={onLogout}>Log out</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />


          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
          <Button variant="default" onClick={onLogout}>Log out</Button>
          </Group>


        </ScrollArea>
      </Drawer>
    </Box>
  );
}