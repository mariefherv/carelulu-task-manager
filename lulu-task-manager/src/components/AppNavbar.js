import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ModalContext from '../ModalContext';
import UserContext from '../UserContext';
import Login from './Login';
import { NavButton, NavDropDown, NavDropDownItem, NavigationBar } from './styled-comp';

export default function AppNavbar(){
	// Contexts
	const {openModal , setOpenModal} = useContext(ModalContext)
	const {user, setUser, unsetUser} = useContext(UserContext)

	const [isHovering, setIsHovering] = useState(false);

	const [mode, setMode] = useState('');

	// Handling Login and Register Form
	const showLogin = () => {
		setMode("login")
		setOpenModal(true)
	}
	const showRegister = () => {
		setMode("register")
		setOpenModal(true)
	}
	const handleClose = () => setOpenModal(false)

	// Toggling drop-down
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const logout = () => {
		unsetUser();
		setUser({
			id: null,
			name: null,
			email: null
		  })
	  
		  Swal.fire({
			title: "Successfully logged out!",
			icon: "success",
			text: "Thank you!"
		  }).then((result) => {
			if(result.isConfirmed){
				// reload page if there are changes
				window.location.reload()
			}
		})
		;

	};

	return (
		<>
		<NavigationBar>
			<img src="https://c2zyebdn.cloudimg.io/s/cdn/x/https://divin2sy6ce0b.cloudfront.net/images/2017-11-06/whiteLogo2-min.png"
				height= "40px"
				className="d-inline-block align-center"
				alt = "CareLulu Logo"
			/>
			{(user.id === null) ?
			<div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			<NavButton >
				Menu
				<svg viewBox="0 0 20 20" width="20" height="20" fill="#FFFFFF">
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>

				{isHovering && <NavDropDown>
					<NavDropDownItem>Home</NavDropDownItem>
					<NavDropDownItem onClick={showLogin}>Login</NavDropDownItem>
					<NavDropDownItem onClick={showRegister}>Sign Up</NavDropDownItem>
					<NavDropDownItem>Contact Us</NavDropDownItem>
				</NavDropDown>}
			</NavButton>
			</div>
			:
			<div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			<NavButton >
				Menu
				<svg viewBox="0 0 20 20" width="20" height="20" fill="#FFFFFF">
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>

				{isHovering && <NavDropDown>
					<NavDropDownItem>Home</NavDropDownItem>
					<NavDropDownItem onClick={logout}>Logout</NavDropDownItem>
				</NavDropDown>}
			</NavButton>
			</div>
			
			}
			
		</NavigationBar>

        <Modal
			size="sm"
            show={openModal}
            onHide={handleClose}
			centered
            >
			<Login prop={{mode: mode}}/>
	    </Modal>


	</>
	)	
};

