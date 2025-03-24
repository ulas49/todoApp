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



export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [searchQuery,setSearchQuery]=useState<string>('')
  const history = useNavigate()


const handleSearch = ()=>{

}


  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-around"  h="100%">
            <img src="" alt="LOGO" />
           <SearchBar value={searchQuery} onChange={({target})=>{
            setSearchQuery(target.value)
           }}
           handleSearch={handleSearch}/>
          <Group visibleFrom="sm">
            <Button variant="default" onClick={()=>history('/login')}>Log out</Button>
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
          <Button variant="default" onClick={()=>history('/login')}>Log out</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}