import React from 'react';
import { Header } from '../components/Header.jsx';
import { TaskBoard } from '../components/TaskBoard.jsx';


export function Home(prop) {

    //& Pass the nam

    return (
        <div>
            <Header />
            <TaskBoard />
        </div>
    )
}