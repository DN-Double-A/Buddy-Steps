import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import { Task } from './Task.jsx'
import { EditTask } from './EditTask.jsx';

export function TaskBoard(props) {


  const { username } = useContext(UserContext)
  const { taskData, setTaskData, areTasksChanged, setAreTasksChanged } = props;

  const [editPopup, setEditPopup] = useState(false)
  const [taskIndex, setTaskIndex] = useState(-1)
  


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
    setAreTasksChanged(false)
  }, [username, areTasksChanged]);

  //& When 'Add Task' button is clicked, trigger 'openTaskPopup' which changes the state of 'taskPopup' and causes the 'NewTask' component to appear
  function openEditPopup(index){
    //~ Pass the index of the Edit Task object to pull data corresponding to index
    setTaskIndex(index)
    //~ set boolean to true so that the edit pop up will appear
    setEditPopup(true)
  }

  function closeEditPopup(){
    setEditPopup(false)
  }

   //& Deletes task from taskData
   function deleteTask(index){
    //~ Delete from task data
    const newTaskData = [...taskData]
    newTaskData.splice(index, 1)
    setTaskData(newTaskData)

    //~ Assign setAreTasksChanged to true to board is refreshed
    setAreTasksChanged(true)
  }


  return (
    <div className='task-board'>
      {taskData.map((task, index) => {
        return <Task task={task.task} startdate = {task.startdate} enddate={task.enddate} key={index} index={index} setTaskData={setTaskData} openEditPopup={openEditPopup}/>
      })}
      <EditTask editPopup={editPopup} closeEditPopup={closeEditPopup} taskIndex={taskIndex} taskData={taskData} setTaskIndex={setTaskIndex} setAreTasksChanged={setAreTasksChanged}/>

    </div>
  );

}
