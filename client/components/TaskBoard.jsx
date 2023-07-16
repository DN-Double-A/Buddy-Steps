import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';
import { Task } from './Task.jsx'

export function TaskBoard(props) {


  const { username } = useContext(ThemeContext)
  const { taskData, setTaskData } = props;
  


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
  }, [username]);



  return (
    <div className='task-board'>
      {taskData.map((task, index) => {
        return <Task task={task.task} startdate = {task.startdate} enddate={task.enddate} key={index}/>
      })}
    </div>
  );

}
