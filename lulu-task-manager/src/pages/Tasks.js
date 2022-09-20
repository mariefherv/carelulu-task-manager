import { Container, Modal, Tabs, Tab } from 'react-bootstrap';
import { CreateTaskBtn, Heading, Subheading } from '../components/styled-comp';
import TaskCard from '../components/TaskCard';
import { useContext, useEffect, useState } from 'react';
import CreateTask from '../components/CreateTask';
import UserContext from '../UserContext';

export default function Tasks(){
    // contexts
    const {user} = useContext(UserContext);

    const [tasks, setTasks] = useState('')
    const [done, setDone] = useState('')

    // handles the create task modal
    const [show, setShow] = useState(false)
    const closeCreateTask = () => setShow(false);
    const showCreateTask = () => setShow(true);

    useEffect(() => {
        fetch("http://localhost:9000/task/view", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                "status" : 200
            }
        })
        .then(res => res.json())
        .then(data => {
            // if there's only one value returned in the query
            if(data.length === 1) {
                const func = () => {return <TaskCard taskProp={data[0]}/>}
                (data[0].status === "Done") ? setDone(func) : setTasks(func)
                
            } else if (data.length > 1){
            // if more than one
                 // for active tasks
                setTasks(data.map(task => {
                    if(task.status !== "Done"){
                        return(
                            <TaskCard key={task.task_id} taskProp={task}/>          
                        )
                    } else {
                        return null;
                    }
                }))

                // for tasks that are already done (archived)
                setDone(data.map(task => {
                    if(task.status === "Done"){
                        return(
                            <TaskCard key={task.task_id} taskProp={task}/>          
                        )
                    } else {
                        return null;
                    }
                }))
            }
           
    })
    }, [])

    return(
        <>
        <Container>
         <Heading>Task Manager</Heading>
         <Subheading>View, Delete, and Create Tasks</Subheading>
         <div className='d-flex justify-content-center'>
            {(user.id !== null) ?
            <CreateTaskBtn className = "my-4" onClick={showCreateTask}>Create Task</CreateTaskBtn>
            :
            <div className="d-flex flex-column my-4">
            <CreateTaskBtn className = "mb-2" disabled>Create Task</CreateTaskBtn>
            You must login first before you can use this feature.

            </div>
            }
         </div>


        <Tabs
            defaultActiveKey="active"
            className="mb-3"
            fill>
            <Tab eventKey="active" title="Active Tasks">
                    {tasks}
            </Tab>
            <Tab eventKey="done" title="Done">
                    {done}
            </Tab>
        </Tabs>

        </Container>
        
        {show &&
        <Modal 
            show={showCreateTask}
            onHide={closeCreateTask}
            >
            <CreateTask/>
	    </Modal>}
        </>
    )
}