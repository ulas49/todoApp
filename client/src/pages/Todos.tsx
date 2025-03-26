import React,{useEffect, useState} from 'react'
import { HeaderMegaMenu } from '../components/Header'
import { TodoCart } from '../components/TodoCart'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { UserInfo } from '../components/Header'
const Todos:React.FC = () => {
  const [userInfo,setUserInfo]=useState<UserInfo | null>(null)
  const history = useNavigate()

  const getUser = async ()=>{
    try {
      const response = await axiosInstance.get('/api/auth/getUser')
      
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    } catch (error) {
      localStorage.clear()
      history('/login')
    }
  }

  useEffect(()=>{
      getUser()
  },[])

  return (
    <div>
        <HeaderMegaMenu userInfo={userInfo}/>
        <div className='  w-full  '>
        <div className=' grid grid-cols-4 gap-8  card-mb '> <TodoCart/>  <TodoCart/>  <TodoCart/> <TodoCart/> <TodoCart/> <TodoCart/> <TodoCart/> <TodoCart/></div>

        </div>
       
        
    </div>
  )
}

export default Todos