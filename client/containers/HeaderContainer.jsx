import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/Contexts';
import { NewTask } from '../components/NewTask.jsx';
import Icon from '../Assets/Icon.png';
import addIcon from '../Assets/addIcon.png';

export function Header(props) {
  const { globalUsername } = useContext(UserContext);
  const { setTaskData, setAreTasksChanged } = props;

  //& boolean state that controls 'taskPopup' pop up
  const [taskPopup, setTaskPopup] = useState(false);
  const [profile, setProfilePic] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/user/?username=${globalUsername}`);
        const data = await res.json();
        setProfilePic(data.profilepic);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  //& When 'Add Task' button is clicked, trigger 'openTaskPopup' which changes the state of 'taskPopup' and causes the 'NewTask' component to appear
  function openTaskPopup() {
    setTaskPopup(true);
  }

  function closeTaskPopup() {
    setTaskPopup(false);
  }

  return (
    <div className="header">
      <div className="header-container">
        <img src={profile} height="150px" width="150x" object-fit="cover" />
        <h1>{globalUsername.toUpperCase()} TASKS</h1>
        <img
          src={addIcon}
          type="button"
          className="add-task-button"
          onClick={openTaskPopup}
        />
      </div>
      <NewTask
        setTaskData={setTaskData}
        taskPopup={taskPopup}
        closeTaskPopup={closeTaskPopup}
        setAreTasksChanged={setAreTasksChanged}
      />
    </div>
  );
}
