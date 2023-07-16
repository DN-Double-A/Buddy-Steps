import React, {useContext} from 'react';
import ThemeContext from './ThemeContext';


export function Header() {

  const tester = 'tester'
  const { username } = useContext(ThemeContext)

  return (
  <div>{username} Tasks</div>
  );}