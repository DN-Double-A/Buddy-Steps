import React from 'react';
import UserContext from './UserContext';

export function Task(props) {
//TODO: Add button that updates progress (stretch feature)

    const { task, startdate, enddate} = props;

    return (
        <div className='task'>
          <h3 className='task-name'>{task}</h3>
          <hr/>
          <h4>startdate: {startdate}</h4>
          <h4>enddate: {enddate}</h4>
        </div>
      );
}