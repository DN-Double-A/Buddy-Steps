import React, { useState } from 'react';
import { Header } from '../containers/HeaderContainer.jsx';
import { TaskBoard } from '../containers/TaskBoardContainer.jsx';
import { SideContainer } from '../containers/SideContainer.jsx';
import { SideContext } from '../contexts/Contexts.jsx';

export function Home(props) {
  //& Passing state variables to Header and Taskboard
  //& Both componenets need state variable hence why I am initializing them in this component
  const [taskData, setTaskData] = useState([]);

  // Creating boolean to conditionally render the side bar.
  const [isSideBarShowing, setIsSideBarShowing] = useState(true);

  // Creating boolean to notify when the TaskBoard should be refreshed
  const [areTasksChanged, setAreTasksChanged] = useState(false);

  return (
    <>
      <Header
        taskData={taskData}
        setTaskData={setTaskData}
        setAreTasksChanged={setAreTasksChanged}
      />
      <div className="sidebar-taskboard-container">
        <TaskBoard
          taskData={taskData}
          setTaskData={setTaskData}
          setAreTasksChanged={setAreTasksChanged}
          areTasksChanged={areTasksChanged}
        />
        {isSideBarShowing ? (
          <SideContext.Provider
            value={{ isSideBarShowing, setIsSideBarShowing }}
          >
            <SideContainer />
          </SideContext.Provider>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
