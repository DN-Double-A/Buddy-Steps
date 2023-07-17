import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Task } from '../components/Task.jsx';
import { EditTask } from '../components/EditTask.jsx';

export function TaskBoard(props) {
  const { globalUsername } = useContext(UserContext);
  const { taskData, setTaskData, areTasksChanged, setAreTasksChanged } = props;

  const [editPopup, setEditPopup] = useState(false);
  const [taskIndex, setTaskIndex] = useState(-1);

  //& Render tasks on start up and re-render them everytime the username or task data changes
  useEffect(() => {
    // get tasks associated with username
    async function getTasksData(globalUsername) {
      const response = await fetch(`/api/task/?username=${globalUsername}`);
      const newTaskData = await response.json();
      // console.log(newTaskData)
      setTaskData(newTaskData);
      console.log('length: ', newTaskData.length);
    }
    console.log('printing global username in taskboard: ', globalUsername);
    getTasksData(globalUsername);
    // set boolean to false
    setAreTasksChanged(false);
  }, [globalUsername, areTasksChanged]);

  //& When 'Add Task' button is clicked, trigger 'openTaskPopup' which changes the state of 'taskPopup' and causes the 'NewTask' component to appear
  function openEditPopup(index) {
    //~ Pass the index of the Edit Task object to pull data corresponding to index
    setTaskIndex(index);
    //~ set boolean to true so that the edit pop up will appear
    setEditPopup(true);
  }

  function closeEditPopup() {
    setEditPopup(false);
  }

  //& Deletes task from taskData
  async function deleteTask(index) {
    //~ Get task id corresponding to index
    const taskID = taskData[index].taskID;
    try {
      //~ Delete from database
      const response = await fetch(`/api/task/?taskId=${taskID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      //~ Assign setAreTasksChanged to true to board is refreshed
      setAreTasksChanged(true);
    } catch (err) {
      console.log('error occured in delete Task, ', err);
    }
  }

  return (
    <div className="task-board">
      {taskData.map((task, index) => {
        return (
          <Task
            task={task.task}
            taskID={task.taskID}
            startdate={task.startdate}
            enddate={task.enddate}
            key={index}
            index={index}
            setTaskData={setTaskData}
            openEditPopup={openEditPopup}
            deleteTask={deleteTask}
          />
        );
      })}
      <EditTask
        editPopup={editPopup}
        closeEditPopup={closeEditPopup}
        taskIndex={taskIndex}
        taskData={taskData}
        setTaskIndex={setTaskIndex}
        setAreTasksChanged={setAreTasksChanged}
      />
    </div>
  );
}
