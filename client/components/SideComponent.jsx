import React from 'react';
import { useContext } from 'react';
import { SideContext } from '../contexts/SideContext';

export function SideComponent() {
  const { isSideBarShowing, setIsSideBarShowing } = useContext(SideContext);
  return (
    <>
      <button className="side-buttons" id="friends-button">
        Friends List
      </button>
      <button className="side-buttons" id="maps-button">
        Google
      </button>
    </>
  );
}
