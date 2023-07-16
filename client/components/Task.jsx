import React from 'react';
import UserContext from './UserContext';

export function Task(props) {
//TODO: Add button that updates progress (stretch feature)

    const { task, startdate, enddate} = props;

    return (
        <div className='task'>
          <div className='task-name'>{task}</div>
          <div>startdate: {startdate}</div>
          <div>enddate: {enddate}</div>
        </div>
      );
}