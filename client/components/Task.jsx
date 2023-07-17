import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/Contexts';


export function Task(props) {
  const { task, taskID, startdate, enddate, openEditPopup, index, deleteTask } = props;
  const currentDate = new Date();
  const newEndDate = new Date(enddate);
  const formattedStartDate = formatDate(currentDate);
  const formattedEndDate = formatDate(newEndDate);
  const daysLeft = calcDaysLeft(newEndDate, currentDate);
  const [progressBarValue, setProgressBarValue] = useState(0)
  const { globalUsername } = useContext(UserContext);

  // //& Update progress bar on render, render every time progressBarValue changes
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       //~ Get current progress
  //       let response = await fetch('/api/progress/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           taskId: taskID,
  //           username: globalUsername,
  //         }),
  //       })
  //       let data = await response.json()
  //       console.log('taskID and data in task.jsx: ', taskID, data)
  //       console.log('value being assigned to progress value: ', data.currprogress)
  //       setProgressBarValue(data.currprogress)
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])

  //& increment progressBarValue
  //& get data from server then update data on server
  async function updateProgress() {
    // //~ Get current progress
    // let response = await fetch('/api/progress/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     taskId: taskID,
    //     username: globalUsername,
    //   }),
    // })
    // let data = await response.json()
    // console.log('in uppdate progress,', taskID, task, progressBarValue)
    // const newProgressBarValue = 10 + data.currprogress;
    // //~ set state to the updated value
    // setProgressBarValue(newProgressBarValue)
    // console.log('num being sentin patch: ', newProgressBarValue)
    // //~ Update value on server
    // response = await fetch('/api/progress/', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     taskId: taskID,
    //     username: globalUsername,
    //     newprogress: newProgressBarValue,
    //   }),
    // })
    setProgressBarValue(progressBarValue+10);
  }

  return (
    <div className="task">
      <div className="task-name">{task}</div>
      <hr />
      <div id="start-date">Start Date: {formattedStartDate}</div>
      <div id="end-date">End Date: {formattedEndDate}</div>
      <div id="days-left">{daysLeft}</div>
      <progress className="progress-bar" value={progressBarValue} max="100" />
      <button
        className="progress-bar-progress-button"
        onClick={updateProgress}
        index={index}
      >Update Progress</button>
      <hr />
      <button
        className="progress-bar-edit-button"
        onClick={() => openEditPopup(index)}
        index={index}
      >
        Edit
      </button>
      <button
        className="progress-bar-delete-button"
        onClick={() => deleteTask(index)}
      >
        X
      </button>
    </div>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}

function calcDaysLeft(date1, date2) {
  var diff = Math.floor(date1.getTime() - date2.getTime());
  var day = 1000 * 60 * 60 * 24;

  var days = Math.floor(diff / day);

  var message = days + ' days left';

  return message;
}
