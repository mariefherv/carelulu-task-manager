import { Button, ButtonGroup, FormControl, Row } from 'react-bootstrap';
import { CreateTaskBtn, CreateTaskContainer, Heading } from './styled-comp';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import { useState } from 'react';

export default function EditTask({editProp}){
    const { task_id, title, note, deadline } = editProp

    var time_Local = ''
    var val = false;
    
    // if date is not null
    if(deadline !== '0000-00-00 00:00:00' && deadline !== undefined){
        // converting sql timestamp
        const day = deadline.substring(0,10);
        const hour = deadline.substring(11,16);

        var time_stamp = new Date(hour + " " + day);
        time_Local = time_stamp.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
        val = true;
    }

    const [hasDeadline, setHasDeadline] = useState(val)
    const [date, setDate] = useState(time_stamp)
    const [taskName, setTaskName] = useState(title)
    const [taskNote, setTaskNote] = useState(note)
    

    const handleDateChange = (value) => {
        setDate(value)
    }

    const handleDeadline = () => {
        setHasDeadline(true);
        setDate(date)
    }

    const handleNoDeadline = () => {
        setHasDeadline(false);
        setDate(date);
    }

    // edit task function
    const editTask = (e) =>  {
        e.preventDefault()

        fetch(`http://localhost:9000/task/edit/${task_id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title : taskName,
                note : taskNote,
                deadline : date,
                status : "In Progress"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                Swal.fire({
                    title: "Task Updated!",
                    icon: "success",
                    text: "Keep up the good work!",
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
        <Heading>Edit Task</Heading>
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
                <CreateTaskBtn className = "my-4" onClick={editTask}>Edit Task</CreateTaskBtn>
            </div>
         </CreateTaskContainer>
        </>
    )
}