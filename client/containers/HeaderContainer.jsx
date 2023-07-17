import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/Contexts';
import { NewTask } from '../components/NewTask.jsx';
import Icon from '../Assets/Icon.png';

export function Header(props) {
  const { globalUsername } = useContext(UserContext);
  const { setTaskData, setAreTasksChanged } = props;

  //& boolean state that controls 'taskPopup' pop up
  const [taskPopup, setTaskPopup] = useState(false);
  const [profile, setProfilePic] = useState('');
  const [name, setName] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/user/?username=${globalUsername}`);
        const data = await res.json();
        setProfilePic(data.profilepic);
        setName(data.name)
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
        <img className='profile-pic ' src={profile} height="150px" width="150x" object-fit="cover" />
        <h1>Welcome {name}<br/>Here are your Current Habits: </h1>
        <img
          src={Icon}
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
