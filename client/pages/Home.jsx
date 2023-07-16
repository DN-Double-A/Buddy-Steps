import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { TaskBoard } from '../components/TaskBoard.jsx';


export function Home(props) {

    //& Passing state variables to Header and Taskboard
    //& Both componenets need state variable hence why I am initializing them in this component
    const [taskData, setTaskData] = useState([])

    // Creating boolean to notify when the TaskBoard should be refreshed
    const [isNewTaskAdded, setIsNewTaskAdded] = useState(false)

    return (
        <div>
            <Header taskData={taskData} setTaskData={setTaskData} setIsNewTaskAdded={setIsNewTaskAdded}/>
            <TaskBoard taskData={taskData} setTaskData={setTaskData} setIsNewTaskAdded={setIsNewTaskAdded} isNewTaskAdded={isNewTaskAdded}/>
        </div>
    )
}
