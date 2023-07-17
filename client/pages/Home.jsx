import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { TaskBoard } from '../components/TaskBoard.jsx';
import { SideContainer } from '../containers/SideContainer.jsx';
import { SideContext } from '../contexts/SideContext.jsx';

export function Home(props) {
  //& Passing state variables to Header and Taskboard
  //& Both componenets need state variable hence why I am initializing them in this component
  const [taskData, setTaskData] = useState([]);

  // Creating boolean to conditionally render the side bar.
  const [isSideBarShowing, setIsSideBarShowing] = useState(false);

  // Creating boolean to notify when the TaskBoard should be refreshed
  const [areTasksChanged, setAreTasksChanged] = useState(false);

  return (
    <div>
      <Header
        taskData={taskData}
        setTaskData={setTaskData}
        setAreTasksChanged={setAreTasksChanged}
      />
      <TaskBoard
        taskData={taskData}
        setTaskData={setTaskData}
        setAreTasksChanged={setAreTasksChanged}
        areTasksChanged={areTasksChanged}
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
