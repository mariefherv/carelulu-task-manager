import {Form} from 'react-bootstrap';
import { Heading, ModalBtn,ModalContainer, ModalLink } from './styled-comp';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
import { useContext, useState } from 'react';
import UserContext from '../UserContext';
import ModalContext from '../ModalContext';

export default function Login({prop}){
    const {setUser} = useContext(UserContext);
    const {setOpenModal} = useContext(ModalContext);
    
    // Determine which form to use (login/register)
    let { mode } = prop
    const [formMode, setFormMode] = useState(mode);

    // For the form values
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // To be able to toggle between login and register form
    const loginForm = () => {
        setFormMode("login")
    }

    const registerForm = () => {
        setFormMode("register")
    }

    // Login Function
    const loginUser = (e) => {
        e.preventDefault()
        
        fetch('http://localhost:9000/user/login', {

        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            "status" : 200
        },
        body: JSON.stringify({
            email : email,
            password : password
        })

        }).then(res => res.json())
        .then(data => {
            if(typeof data.accessToken !== "undefined"){
                localStorage.setItem('token',data.accessToken)
                retrieveUserDetails(data.accessToken)

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to CareLulu Task Manager"
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.reload()
                    }
                })

                setOpenModal(false)

            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your credentials"
                }) 
            }
        
        })
        setEmail('');
        setPassword('');

    }

    // Register Function
    const registerUser = (e) =>  {
        console.log(email,password)
        e.preventDefault()
        
        fetch('http://localhost:9000/user/register', {

        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            "status" : 200
        },
        body: JSON.stringify({
            full_name : name,
            email : email,
            password : password
        })

        }).then(res => res.json())
        .then(data => {
            if(typeof data.accessToken !== "undefined"){
                localStorage.setItem('token',data.accessToken)
                retrieveUserDetails(data.accessToken)

                Swal.fire({
                    title: "Registration Successful!",
                    icon: "success",
                    text: "Welcome to CareLulu Task Manager"
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.reload()
                    }
                })

                setOpenModal(false)

            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your credentials"
                }) 
            }
        
        })
        setName('');
        setEmail('');
        setPassword('');

    }

    const retrieveUserDetails = (token) =>{
        fetch('http://localhost:9000/user/getUserDetails',{
        headers : {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            "status" : 200
        }
        }).then(res => res.json())
        .then(data => {
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
        
    }

    
   return(
        <>
        {(formMode==="login") &&
        <ModalContainer className="d-flex flex-column align-items-center">
        <Heading className = "mb-3">Login</Heading>
            <Form>
                <Form.Control className="mb-3" type="email" placeholder="Enter email"
                value={email}
                onChange = {e => setEmail(e.target.value)} />
                <Form.Control className="mb-3" type="password" placeholder="Password"
                value={password}
                onChange = {e => setPassword(e.target.value)} />
            </Form>
            <ModalBtn className="mb-3" onClick={loginUser}> Sign In </ModalBtn>
            Don't have an account yet?
            <ModalLink  onClick={registerForm}>Sign Up</ModalLink>
        </ModalContainer>
        }
        {(formMode==="register") &&
        <ModalContainer className="d-flex flex-column align-items-center">
        <Heading className = "mb-3">Sign Up</Heading>
            <Form>
                <Form.Control className="mb-3" type="text" placeholder="Full Name"
                value={name}
                onChange = {e => setName(e.target.value)} />
                <Form.Control className="mb-3" type="email" placeholder="Enter email"
                value={email}
                onChange = {e => setEmail(e.target.value)} />
                <Form.Control className="mb-3" type="password" placeholder="Password"
                value={password}
                onChange = {e => setPassword(e.target.value)} />
            </Form>
            <ModalBtn className="mb-3" onClick={registerUser}> Register </ModalBtn>
            Already have an account?
            <ModalLink  onClick={loginForm}>Sign In</ModalLink>
        </ModalContainer>}
        </>
    )
}