import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

export function EditTask(props) {
  const {
    editPopup,
    closeEditPopup,
    taskIndex,
    setTaskIndex,
    taskData,
    setAreTasksChanged,
  } = props;
  // const { username } = useContext(UserContext)
  const emptyForm = {
    updatedTask: new Date(),
    updatedEndTime: new Date(),
    taskID: null,
  };
  const [formData, setFormData] = useState(emptyForm);

  //& On rendering the Edit task, need to display current task data
  useEffect(() => {
    if (taskIndex != -1) {
      //on the very first render before user even gets a chance to press the edit button. we dont want to run the code below. test task index to a default value of -1 in taskboard.jsx
      // console.log(taskData[taskIndex])
      // console.log(typeof taskData[taskIndex].enddate)
      setFormData({
        updatedTask: taskData[taskIndex].task,
        updatedEndTime: taskData[taskIndex].enddate,
        taskID: taskData[taskIndex].taskID,
      });
    }
  }, [taskIndex]);

  //& Auto updates form data when input box of form is filled in
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  //& Handle request on submit button
  async function handleSubmit(event) {
    event.preventDefault();

    //~ Get form data to send to API
    const { taskID, updatedTask, updatedEndTime } = formData;
    const data = { updatedTask: updatedTask, updatedEndTime: updatedEndTime };
    console.log(data);
    console.log(taskID);

    try {
      //~ Update task by sending patch request to api
      //TODO: check if fields are empty and return error
      const response = await fetch(`/api/task/?taskId=${taskID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      //~ Set the areTasksChanged boolean to true to notify the TaskBoard to refresh
      setAreTasksChanged(true);

      //~ Reset form
      setFormData(emptyForm);

      //~ Reset task index
      setTaskIndex(-1);

      //~ close popout
      closeEditPopup();
    } catch (err) {
      console.log('error occured in Edit Task, ', err);
    }
  }

  return (
    <div>
      {editPopup ? (
        <div className="new-task-popup">
          <div className="new-task-popup-inner">
            <h2>Edit Your Task</h2>
            <hr />
            <form onSubmit={handleSubmit} className="form">
              <div>
                <label htmlFor="updatedTask"><h3>Task Name</h3></label>
                <input
                  type="text"
                  id="text"
                  name="updatedTask"
                  value={formData.updatedTask}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <label htmlFor="updatedEndTime"><h3>End Date</h3></label>
                {/* <input type='text' id='text' name='updatedEndTime' value={formData.updatedEndTime} onChange={handleChange}></input> */}
                <div>
                  <DatePicker
                    selected={new Date(formData.updatedEndTime)}
                    onChange={(date) => {
                      setFormData((prevForm) => {
                        return { ...prevForm, updatedEndTime: date };
                      });
                    }}
                  />
                </div>
              </div>
              <button className="new-task-submit-button">Submit</button>
            </form>
            <button className="new-task-close-button" onClick={closeEditPopup}>
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
