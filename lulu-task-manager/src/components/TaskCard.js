import { Col, Row, Modal } from 'react-bootstrap';
import { Card, DeleteBtn, DoneBtn, EditBtn, TaskDone, TaskDue, TaskNote, TaskOverdue, TaskTitle } from './styled-comp';
import { useState } from 'react';
import Swal from 'sweetalert2'
import EditTask from './EditTask';

export default function TaskCard({taskProp}){
    
    // get details from the prop
    const { task_id, title, note, deadline, status } = taskProp;   

    var time_Local = '';
    
    // if date is not null
    if(deadline !== '0000-00-00 00:00:00' && deadline !== undefined){
        // converting sql timestamp
        const day = deadline.substring(0,10);
        const hour = deadline.substring(11,16);

        // adjust in PDT
        const time_stamp = new Date(hour + " " + day);
        time_Local = time_stamp.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

    } else {
        time_Local = null;
    }

    // handles the edit task modal
    const [edit, setEdit] = useState(false)
    const closeEditTask = () => setEdit(false);
    const showEditTask = () => setEdit(true);

    // mark as done function
    const markDone = (e) =>  {
        e.preventDefault()

        fetch(`http://localhost:9000/task/markDone/${task_id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                "status" : 200
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title: "Task Done!",
                    icon: "success",
                    text: "Yippie! Let's get it going!"
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

    // delete task function
    const deleteTask = (e) =>  {
        e.preventDefault()

        fetch(`http://localhost:9000/task/delete/${task_id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                "status" : 200
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title: "Task Deleted!",
                    icon: "success",
                    text: "Less workload, at least..."
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
         <Card>
            <Row className="d-flex flex-row">
                <Col className="d-flex flex-column py-3">
                    <TaskTitle className="ps-4">
                        {title}
                    </TaskTitle>
                    <TaskNote className="ps-4">
                        {note}
                    </TaskNote>
                        
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                    {(status === "Done") &&
                        <TaskDone className="pb-2">
                            Done
                        </TaskDone>
                     }
                     {(status === "In Progress"  && time_Local !== null) &&
                        <TaskDue className="pb-2">
                            Due on {time_Local} (PDT)
                        </TaskDue>
                     }
                     {(status === "Overdue"  && time_Local !== null) &&
                        <TaskOverdue className="pb-2">
                            Overdue! Deadline: {time_Local} (PDT)
                        </TaskOverdue>
                     }
         
                    </Col>
                    {(!(status==="Done")) &&
                    <Col className="d-flex flex-row ps-3 py-2 align-items-center justify-content-end">
                        {/* only show if task is not yet done */}
                        <DoneBtn className = "px-3 py-2 mx-2" onClick={markDone}>Mark As Done</DoneBtn>
                        <EditBtn className = "px-3 py-2 mx-2" onClick={showEditTask}>Edit</EditBtn>
                        <DeleteBtn className = "px-3 py-2 mx-2" onClick={deleteTask}>Delete</DeleteBtn>
                    </Col>}
                </Row>
         </Card>

         {edit &&
        <Modal 
            show={showEditTask}
            onHide={closeEditTask}
            >
            <EditTask editProp={taskProp}/>
	    </Modal>}
        </>

    )
}