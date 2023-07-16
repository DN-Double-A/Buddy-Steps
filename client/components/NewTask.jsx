import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';


export function NewTask(props) {

  //   const tester = 'tester'
  const { username } = useContext(ThemeContext)
  const { taskData, taskPopup } = props;



  return (

    <div>
      {
        taskPopup ? // if taskPopup is true, will render the NewTask obj. Otherwise nothing will be shown
          <div className='new-task-popup'>
            <div className='new-task-popup-inner'>
              <div>{username} Tasks</div>
              <button className='submit-button' >Submit</button>
              <button className='close-button' >Close</button>
            </div>
          </div> : ''
      }
    </div>
  );
}