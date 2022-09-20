import { Button, ButtonGroup, FormControl, Row } from 'react-bootstrap';
import { CreateTaskBtn, CreateTaskContainer, Heading } from './styled-comp';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

export default function CreateTask(){

    const [hasDeadline, setHasDeadline] = useState(false)

    const [taskName, setTaskName] = useState('Untitled')
    const [taskNote, setTaskNote] = useState('')
    const [date,setDate] = useState('')

    const handleDateChange = (value) => {
        setDate(value)
    }

    const handleDeadline = () => {
        setHasDeadline(true);
        setDate(new Date())
    }

    const handleNoDeadline = () => {
        setHasDeadline(false);
        setDate('');
    }

    // mark as create function
    const createTask = (e) =>  {
        e.preventDefault()

        fetch(`http://localhost:9000/task/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                "status" : 200
            },
            body: JSON.stringify({
                title : taskName,
                note : taskNote,
                deadline : date,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title: "Task Created!",
                    icon: "success",
                    text: "Let's start grinding!"
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.reload()
                    }
                })

            } else {
                Swal.fire({
                    title: "Something went wrong :(",
                    icon: "error",
                    text: "Please try again."
                })
            }
        })
    }
    
   return(
        <>
        <Heading>Create a Task</Heading>
        <CreateTaskContainer>
            <FormControl className = "mb-3" placeholder='Task Name'
            value={taskName}
            onChange={e => {setTaskName(e.target.value)}}
            />

            <FormControl className = "mb-3" as="textarea" rows ={5}
            placeholder = 'Note'
            value={taskNote}
            onChange={e => setTaskNote(e.target.value)}    
            />
            <Row  className='d-flex'>
            
            { hasDeadline ? 
            
            <ButtonGroup className="mb-2" vertical>
                <Button variant = "light" onClick={handleNoDeadline}> 
                    No Deadline 
                </Button>
                <Button variant = "light" active> 
                    Set Deadline 
                </Button>
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    value={date}
                    locale="en"
                    className="mt-3 w-100"
                />
            </ButtonGroup>
            :
            <ButtonGroup className="mb-2" vertical>
                <Button variant = "light" active> 
                    No Deadline 
                </Button>
                <Button variant = "light" onClick={handleDeadline}>
                    Set Deadline
                </Button>
            </ButtonGroup>
            
            }


            </Row>
            
            <div className='d-flex justify-content-center'>
                <CreateTaskBtn className = "my-4" onClick={createTask}>Create Task</CreateTaskBtn>
            </div>
         </CreateTaskContainer>
        </>
    )
}