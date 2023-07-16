import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import { Task } from './Task.jsx'

export function TaskBoard(props) {


  const { username } = useContext(UserContext)
  const { taskData, setTaskData, isNewTaskAdded, setIsNewTaskAdded } = props;
  


  //& Render tasks on start up and re-render them everytime the username or task data changes
  useEffect(() => {
    // get tasks associated with username
    async function getTasksData(username) {
      const response = await fetch(`/api/task/?username=${username}`)
      const newTaskData = await response.json()
      // console.log(newTaskData)
      setTaskData(newTaskData)
      console.log('length: ',newTaskData.length)
    }
    getTasksData(username)
    // set boolean to false
    setIsNewTaskAdded(false)
  }, [username, isNewTaskAdded]);



  return (
    <div className='task-board'>
      {taskData.map((task, index) => {
        return <Task task={task.task} startdate = {task.startdate} enddate={task.enddate} key={index} setTaskData={setTaskData}/>
      })}
    </div>
  );

}
