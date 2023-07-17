import React, { useContext, useState } from 'react';
import UserContext from './UserContext';
import { NewTask } from './NewTask.jsx';
import Icon from '../Assets/Icon.png';
import addIcon from '../Assets/addIcon.png'


export function Header(props) {

  const { username } = useContext(UserContext)
  const { setTaskData, setAreTasksChanged } = props;
  
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
      <div className='header-container'>
      <h1>{username.toUpperCase()} TASKS</h1>
      <img src={addIcon} type='button' className='add-task-button' onClick={openTaskPopup} />
      </div>
      <NewTask setTaskData={setTaskData} taskPopup={taskPopup} closeTaskPopup={closeTaskPopup} setAreTasksChanged={setAreTasksChanged}/>
    </div>
  );
}