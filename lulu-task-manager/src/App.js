import { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { ModalState } from './ModalContext';
import Tasks from './pages/Tasks';
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
		id: null,
		name: null,
		email: null
	});

	const unsetUser = () => {
		localStorage.clear();
	};

  // for the modal
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token') !== undefined){
      fetch('http://localhost:9000/user/getUserDetails',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true,
          "status" : 200
        }
      }).then(res => res.json())
      .then(data =>{
        if(typeof data[0].user_id !== "undefined"){
          setUser({
            id: data[0].user_id,
            name: data[0].full_name,
            email: data[0].email					
          });
        } else {
          setUser({
            id: null,
            name: null,
            email: null
          })
        }
      })
	}}, [])

  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
    <ModalState value={{openModal, setOpenModal}}>
    <AppNavbar />
    <Tasks />
    </ModalState>
    </UserProvider>
    </>
  );
}

export default App;
