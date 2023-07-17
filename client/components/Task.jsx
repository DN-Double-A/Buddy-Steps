import React from 'react';
import UserContext from './UserContext';

export function Task(props) {

  const { task, startdate, enddate, openEditPopup, index } = props;


  return (
    <div className='task'>
      <div className='task-name'>{task}</div>
      <div>startdate: {startdate}</div>
      <div>enddate: {enddate}</div>
      <progress className="progress-bar" value="50" max="100" />
      <button className='progress-bar-edit-button' onClick={() => openEditPopup(index)} index={index} >Edit</button>
      <button className='progress-bar-delete-button' >X</button>
    </div>
  );
}