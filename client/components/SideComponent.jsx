import React from 'react';
import { useContext, useState } from 'react';
import { SideContext } from '../contexts/Contexts';
import friends from '../Assets/friends.png';
import maps from '../Assets/maps.png';
import signout from '../Assets/signout.png';
import camera from '../Assets/camera.png';
import complete from '../Assets/complete.png';

export function SideComponent() {
  const [friendPopUp, setFriendPopUp] = useState(false);

  function openFriendPopup() {
    setFriendPopUp(true);
  }

  function closeFriendPopup() {
    setFriendPopUp(false);
  }
  function signOut() {
    window.location.href = '/';
  }
  return (
    <>
      <span title="Add Friends">
        <img
          src={friends}
          type="button"
          className="side-buttons"
          id="friends-button"
          onClick={openFriendPopup}
        />
      </span>
      Add Friends
      {/* {friendPopUp ? (<div>Hello</div>): ('')} */}
      <span title="Current Location">
        <img
          src={maps}
          type="button"
          className="side-buttons"
          id="maps-button"
        />
      </span>
      Current Location
      <span title="Progress Picture">
        <img
          src={camera}
          type="button"
          className="side-buttons"
          id="camera-button"
        />
      </span>
      Progress Picture
      <span title="Completed Habits" className="complete-span">
        <img
          src={complete}
          type="button"
          className="side-buttons complete"
          id="complete-button"
        />
      </span>
      Habits Finished
      <span title="Sign Out">
        <img
          src={signout}
          type="button"
          className="side-buttons"
          id="sign-out-button"
          onClick={signOut}
          alt="sign-out image"
        />
      </span>
      Sign Out
    </>
  );
}
