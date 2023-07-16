import React, { useContext, useState } from 'react';
import UserContext from './UserContext';


export function NewTask(props) {

  //   const tester = 'tester'
  const { username } = useContext(UserContext)
  const { setIsNewTaskAdded, taskPopup, closeTaskPopup, setTaskData } = props;
  const emptyForm = { taskName: '', days: '' }
  const [formData, setFormData] = useState(emptyForm)

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

  }

  function handleSubmit(event) {
    event.preventDefault();

    //~ Compile data to send to API

    // Get current date
    const currDate = new Date()
    // Calculate end date
    const endDate = new Date()
    endDate.setDate(currDate.getDate() + Number(formData.days))
    console.log('data to send: ', formData.taskName, currDate, endDate)

    //~ Create new task by sending POST req with data
    async function createNewTask() {
      try {
        const response = await fetch(`/api/task/?username=${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: formData.taskName, startDate: currDate, endDate: endDate }),
        });

        //~ Set the isNewTaskAdded boolean to true to notify the TaskBoard to refresh
        setIsNewTaskAdded(true)

        //~ Reset Form
        setFormData(emptyForm)

        //~ Close Popout
        closeTaskPopup();

      }
      catch (err) {
        console.log(err)
      }
    }
    createNewTask()

    // //~ Pull new list of tasks. set task data to new task list
    // // copied from TaskBoard.jsx
    // async function getTasksData(username) {
    //   const response = await fetch(`/api/task/?username=${username}`)
    //   const newTaskData = await response.json()
    //   // console.log(newTaskData)
    //   setTaskData(newTaskData)
    //   console.log('length: ', newTaskData.length)
    // }
    // getTasksData(username)


  }

  return (

    <div>
      {
        taskPopup ? // if taskPopup is true, will render the NewTask obj. Otherwise nothing will be shown
          <div className='new-task-popup'>
            <div className='new-task-popup-inner'>
              <div>{username} Tasks</div>

              <form onSubmit={handleSubmit}>
                <label htmlFor='taskName'>Task Name:</label>
                <input type='text' id='taskName' name='taskName' value={formData.taskName} onChange={handleChange}></input>
                <label htmlFor='days'>Number of Days to Complete Task:</label>
                <input type='text' id='days' name='days' value={formData.days} onChange={handleChange}></input>
                <button className='new-task-submit-button' >Submit</button>
              </form>

              <button className='new-task-close-button' onClick={closeTaskPopup} >X</button>
            </div>
          </div> : ''
      }
    </div>
  );
}