import React, { useContext, useState } from 'react';
import UserContext from './UserContext';

export function NewTask(props) {
  //   const tester = 'tester'
  const { username } = useContext(UserContext)
  const { setAreTasksChanged, taskPopup, closeTaskPopup, setTaskData } = props;
  const emptyForm = { taskName: '', days: '' }
  const [formData, setFormData] = useState(emptyForm)

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  //& Handle request on submit button
  function handleSubmit(event) {
    event.preventDefault();

    //~ Get form data and additional data to send to API

    // Get current date
    const currDate = new Date();
    // Calculate end date
    const endDate = new Date()
    endDate.setDate(currDate.getDate() + Number(formData.days))
    // console.log('data to send: ', formData.taskName, currDate, endDate)

    //~ Create new task by sending POST req with data
    async function createNewTask() {
      try {
        //TODO: check if fields are empty and return error
        const response = await fetch(`/api/task/?username=${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task: formData.taskName,
            startDate: currDate,
            endDate: endDate,
          }),
        });

        //~ Set the areTasksChanged boolean to true to notify the TaskBoard to refresh
        setAreTasksChanged(true)

        //~ Reset Form
        setFormData(emptyForm);

        //~ Close Popout
        closeTaskPopup();
      } catch (err) {
        console.log(err);
      }
    }
    createNewTask()
  }

  return (
    <div>
      {taskPopup ? ( // if taskPopup is true, will render the NewTask obj. Otherwise nothing will be shown
        <div className="new-task-popup">
          <div className="new-task-popup-inner">
            <h2>Create a New Task</h2>
            <hr />

              <form onSubmit={handleSubmit} className='form'>
                <div>
                  <label htmlFor='taskName'>Task Name:</label>
                  <input type='text' id='taskName' name='taskName' value={formData.taskName} onChange={handleChange}></input>
                </div>
                <div>
                  <label htmlFor='days'>Number of Days to Complete Task:</label>
                  <input type='text' id='days' name='days' value={formData.days} onChange={handleChange}></input>
                </div>
                <button className='new-task-submit-button' >Submit</button>
              </form>

              <input
                type="text"
                id="taskName"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
                placeholder="Your Task Here "
              ></input>

              <label htmlFor="days"><h3>Number of Days to Complete</h3></label>

              <input
                type="text"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="Your Day Count Here "
              ></input>

              <button className="new-task-submit-button">Submit</button>
            </form>

            <button className="new-task-close-button" onClick={closeTaskPopup}>
              x
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
