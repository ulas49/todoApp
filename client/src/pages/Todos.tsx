import React from 'react'
import { HeaderMegaMenu } from '../components/Header'
import { TodoCart } from '../components/TodoCart'
const Todos:React.FC = () => {
  return (
    <div>
        <HeaderMegaMenu/>
        <div className='  w-full  '>
        <div className=' grid grid-cols-4 gap-8  card-mb '> <TodoCart/>  <TodoCart/>  <TodoCart/> <TodoCart/> <TodoCart/> <TodoCart/> <TodoCart/> <TodoCart/></div>

        </div>
       
        
    </div>
  )
}

export default Todos