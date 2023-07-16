import React, { useContext, useState } from 'react';
import ThemeContext from './ThemeContext';
import { NewTask } from './NewTask.jsx';


export function Header(props) {

  const { username } = useContext(ThemeContext)
  const { setTaskData, setIsNewTaskAdded } = props;
  
  //& boolean state that controls 'taskPopup' pop up
  const [taskPopup, setTaskPopup] = useState(false)
  
  //& When 'Add Task' button is clicked, trigger 'openTaskPopup' which changes the state of 'taskPopup' and causes the 'NewTask' component to appear
  function openTaskPopup(){
    setTaskPopup(true)
  }

  function closeTaskPopup(){
    setTaskPopup(false)
  }

  return (
    <div className='header'>
      <div>{username} Tasks</div>
      <button className='add-task-button' onClick={openTaskPopup}>Add Task</button>
      <NewTask setTaskData={setTaskData} taskPopup={taskPopup} closeTaskPopup={closeTaskPopup} setIsNewTaskAdded={setIsNewTaskAdded}/>
    </div>
  );
}