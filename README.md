# Buddy-Steps
Take the buddy steps

# React Front End Organization
REACT Front End
App.jsx
globalUsername: context variable, passes username to all parts of the web app
    Home
        taskData: contains data for all tasks. Although taskData is shown only in the taskboard object, it is initialized here because we need to pass ‘setTaskData’ to the header because the new task object is located in header
        areTasksChanged: boolean that indicates if task data is changed. Will cause the the taskBoard to re-render. It is also used in header ->newTask hence why it is here (making the useEffect change on taskData caused an infinite render loop)
        isSideBarShowing: similar to above
        HeaderContainer
            taskPopup: boolean that indicates if newTask action has occurred. Then causes pop up to appear
            profile/name: assigned based on global username
            NewTask
                formData: handles formData
        TaskBoardContainer
            editPopup: boolean that controls popup for editing task (similar to taskPopup)
            taskIndex: task number that is being edited. Need this because the edit button is in a different component then editTask (editTask is adjacent to this so not in same ancestor line) (also need this for delete)
            EditTask
                formData: handles form data
            Task
                editButton(): opens pop up, passes respective index to taskBoard
                deleteButton(): delete task, passes respective index to taskBoard to delete

Future Features
Progress Bar
Currently is just updating and state is NOT saved
Tried implementing feature but doesn't work

Why it is broken
POST req to get the progress info for each bar
PATCH req to update the progress info for each bar
Problem is we are making individual GET requests for each task bar. Not exactly sure what the issue is. I am pretty confident the issue is our DB has a limited number of query requests it can handle at once. This causes some of the information to come back as NULL. Sometimes when you refresh it will go from NULL back to the normal value. 

Potential Solution: 
a potential solution is you implement a method to pull all the information at once rather than in each individual task object. This will result in a lot more work however
With the previous method, the add/delete tasks were auto implemented into the task object so you do not need to implement it into progress bar data
However with this new solution you WILL need to. And the since add/delete task buttons are located in different areas, you will need to create this state at their intersections which is Home…gg no re

Side Bar
Has a bunch of random stuff you can implement

