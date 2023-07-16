import React from 'react';
import ThemeContext from './ThemeContext';


export function Tasks() {

  const { username } = useContext(ThemeContext)
  async function getTasks(username) {
    const response  = await fetch('/api/task/?username=currymonstanacho')
    const data = response.json()
    return data
  }
  const data = getTasks(username);
  console.log(data)
  console.log(getTasks(username))


  return (
  <div>{data}</div>);

}
