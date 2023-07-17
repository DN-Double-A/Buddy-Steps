import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { TaskBoard } from '../components/TaskBoard.jsx';
import { SideContainer } from '../containers/SideContainer.jsx';
import { SideContext } from '../contexts/SideContext.jsx';

export function Home(props) {
  //& Passing state variables to Header and Taskboard
  //& Both componenets need state variable hence why I am initializing them in this component
  const [taskData, setTaskData] = useState([]);

  // Creating boolean to notify when the TaskBoard should be refreshed
  const [isNewTaskAdded, setIsNewTaskAdded] = useState(false);

  // Creating boolean for conditional rendering of side bar
  const [isSideBarShowing, setIsSideBarShowing] = useState(false);

  return (
    <div>
      <Header
        taskData={taskData}
        setTaskData={setTaskData}
        setIsNewTaskAdded={setIsNewTaskAdded}
      />
      <TaskBoard
        taskData={taskData}
        setTaskData={setTaskData}
        setIsNewTaskAdded={setIsNewTaskAdded}
        isNewTaskAdded={isNewTaskAdded}
      />
      {isSideBarShowing ? (
        <SideContext.Provider value={{ isSideBarShowing, setIsSideBarShowing }}>
          <SideContainer />
        </SideContext.Provider>
      ) : (
        ''
      )}
    </div>
  );
}
