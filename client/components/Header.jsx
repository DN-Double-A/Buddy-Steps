import React, { useContext, useState } from 'react';
import ThemeContext from './ThemeContext';
import { NewTask } from './NewTask.jsx';


export function Header(props) {

  const { username } = useContext(ThemeContext)
  const { setTaskData } = props;
  
  //& boolean state that controls 'taskPopup' pop up
  const [taskPopup, setTaskPopup] = useState(false)
  
  //& When 'Add Task' button is clicked, trigger 'newTaskAction' which changes the state of 'addTaskPopup' and causes the 'NewTask' component to appear
  function newTaskAction(){
    setTaskPopup(true)
  }

  return (
    <div className='header'>
      <div>{username} Tasks</div>
      <button className='add-task-button' onClick={newTaskAction}>Add Task</button>
      <NewTask setTaskData={setTaskData} taskPopup={taskPopup} />
    </div>
  );
}