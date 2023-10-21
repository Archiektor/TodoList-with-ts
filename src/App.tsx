import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';

function App() {
    //BLL (Data)
    const todoList_title_1: string = 'What to learn';
    // const todoList_title_2: string = 'What to buy';

    let initialTasks: Array<TaskType> = [
        {
            id: v1(),
            checked: true,
            name: `HTML&CSS`
        },
        {
            id: v1(),
            checked: true,
            name: `JS`
        },
        {
            id: v1(),
            checked: false,
            name: `REACT`
        },
        {
            id: v1(),
            checked: false,
            name: `REDUX`
        },
    ]

    let [tasks1, setTasks1] = useState<Array<TaskType>>(initialTasks);
    let [filter, setFilter] = useState<`all` | `active` | `done`>('all')

    const addTask = (taskName: string) => {
        const newTask = {
            id: v1(),
            checked: false,
            name: taskName
        }
        setTasks1([newTask, ...tasks1]);
    }

    const removeTask = (idx: string) => {
        let filteredTasks = tasks1.filter(t => t.id !== idx)
        setTasks1(filteredTasks);
    }

    let tasksForTodoList = tasks1;
    if (filter === `active`) {
        tasksForTodoList = tasks1.filter(t => !t['checked']);
        //setTasks1(tasksForTodoList);
    }
    if (filter === `done`) {
        tasksForTodoList = tasks1.filter(t => t[`checked`]);
        //setTasks1(tasksForTodoList);
    }

    const filterTasks = (filter: `all` | `active` | `done`) => {
        setFilter(filter);
        //console.log(filter)
    }
    // UI
    return (
        <div className="App">
            <TodoList title={todoList_title_1} tasks={tasksForTodoList} removeTask={removeTask}
                      filterTasks={filterTasks} addTask={addTask}/>
            {/*<TodoList title={todoList_title_2} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
