import React from 'react';

export function Task(props) {
  const { task, startdate, enddate, openEditPopup, index, deleteTask } = props;

  return (
    <div className="task">
      <div className="task-name">{task}</div>
      <hr />
      <div>startdate: {startdate}</div>
      <div>enddate: {enddate}</div>
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
