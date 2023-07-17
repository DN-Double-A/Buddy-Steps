import React from 'react';

export function Task(props) {
  const { task, startdate, enddate, openEditPopup, index, deleteTask } = props;
  const currentDate = new Date();
  const newEndDate = new Date(enddate);
  const formattedStartDate = formatDate(currentDate);
  const formattedEndDate = formatDate(newEndDate);
  const daysLeft = calcDaysLeft(newEndDate, currentDate);
  return (
    <div className="task">
      <div className="task-name">{task}</div>
      <hr />
      <div id="start-date">Start Date: {formattedStartDate}</div>
      <div id="end-date">End Date: {formattedEndDate}</div>
      <div id="days-left">{daysLeft}</div>
      <progress className="progress-bar" value="50" max="100" />
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
