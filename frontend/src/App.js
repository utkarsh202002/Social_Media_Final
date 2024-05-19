import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Createpost from './components/Createpost';

import { createContext, useState } from 'react';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollwingPost from './components/MyFollowingPost';
import Follow from './components/Follow';
import News1 from './components/News1';


function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin , setModalOpen}}>
        <Navbar login = {userLogin}/>
        <Routes>
            <Route path='/' element={<MyFollwingPost/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route exact path='/profile' element={<Profile/>}></Route>
            <Route path='/createPost' element={<Createpost/>}></Route>
            <Route path='/profile/:userid' element={<UserProfile/>}></Route>
            <Route path='/followingpost' element={<MyFollwingPost/>}></Route>
            <Route path='/follow' element={<Follow/>}></Route>
            <Route path='/news' element={<News1/>}></Route>
            

        </Routes>
        <ToastContainer theme='dark'/>
        {modalOpen && <Modal setModalOpen = {setModalOpen}></Modal>}
        

        </LoginContext.Provider>
        
      </div>
    </BrowserRouter>

  );
}

export default App;
