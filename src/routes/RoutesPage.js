import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Studentlist from '../pages/studentlist/Index'
import Tasklist from '../pages/tasklist/Index'
import TaskDetail from '../pages/tasklist/TaskDetail'
import StudentTaskList from '../pages/studentlist/StudentTaskList'
import Chat from '../pages/chat/Index'
import StudentProtected from './StudentProtected'
import TeacherProtected from './TeacherProtected'
import NavbarC from '../components/navbar/NavbarC'
import RegisterationButton from '../pages/registerbutton/RegisterationButton'
import Landing from '../pages/landingpage/Landing'

const RoutesPage = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/regiterprepare' element={<RegisterationButton />}/>
        <Route path='/register/student' element={<Register />}/>
        <Route path='/register/teacher' element={<Register />}/>
        <Route element={<TeacherProtected/>} >
        <Route path='/studentlist' element={<><NavbarC /> <Studentlist /></>}/>
        <Route path='/tasklist' element={<><NavbarC /> <Tasklist /></>}/>
        <Route path='/task/:id' element={<><NavbarC /><TaskDetail /></>}/>
        <Route path='/chat/:id' element={<><NavbarC/><Chat /></>}/>
        </Route>
        <Route element={<StudentProtected/>} >
        <Route path='/studenttasks' element={<><NavbarC/><StudentTaskList /></>}/>
        <Route path='/tasks/:id' element={<><NavbarC/><TaskDetail /></>}/>
        <Route path='/chats/:id' element={<><NavbarC/><Chat /></>}/>
        </Route>
        </Routes>
    </>
  )
}

export default RoutesPage