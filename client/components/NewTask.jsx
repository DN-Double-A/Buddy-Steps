import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/Contexts';

export function NewTask(props) {
  //   const tester = 'tester'
  const { globalUsername } = useContext(UserContext);
  const { setAreTasksChanged, taskPopup, closeTaskPopup, setTaskData } = props;
  const emptyForm = { taskName: '', days: '' };
  const [formData, setFormData] = useState(emptyForm);

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
    const endDate = new Date();
    endDate.setDate(currDate.getDate() + Number(formData.days));
    // console.log('data to send: ', formData.taskName, currDate, endDate)

    //~ Create new task by sending POST req with data
    async function createNewTask() {
      try {
        //TODO: check if fields are empty and return error
        const response = await fetch(`/api/task/?username=${globalUsername}`, {
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
        setAreTasksChanged(true);

        //~ Reset Form
        setFormData(emptyForm);

        //~ Close Popout
        closeTaskPopup();
      } catch (err) {
        console.log(err);
      }
    }
    createNewTask();
  }

  return (
    <div>
      {taskPopup ? ( // if taskPopup is true, will render the NewTask obj. Otherwise nothing will be shown
        <div className="new-task-popup">
          <div className="new-task-popup-inner">
            <h2>Create a New Task</h2>
            <hr />

            <form onSubmit={handleSubmit} className="form">
              <div>
                <label htmlFor="taskName"><h3>Task Name</h3></label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  placeholder='New Task'
                ></input>
              </div>
              <div>
                <label htmlFor="days"><h3>Days to Complete Task</h3></label>
                <input
                  type="text"
                  id="days"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  placeholder='Days to Complete'
                ></input>
              </div>
                <button className="new-task-submit-button">Submit</button>
                </form>
                <button className="new-task-close-button" onClick={closeTaskPopup}>
                x
                </button>
          </div>
        </div>
      ) : ('')}
    </div>
  );
}
