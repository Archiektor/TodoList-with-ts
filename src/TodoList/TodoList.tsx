import React from 'react';
import './TodoList.css';

export type TaskType = {
    id: number
    checked: boolean
    name: string
}

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idx: number) => void
    filterTasks: (filter: `all` | `active` | `done`) => void
}

export const TodoList: React.FC<TodoListType> = ({title, tasks, removeTask, filterTasks}) => {
    return (
        <div className={`todolist`}>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(({id, checked, name}) => {
                    return (
                        <li key={id}><input type="checkbox" checked={checked}/> <span>{name}</span>
                            <button onClick={() => removeTask(id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => filterTasks('all')}>All</button>
                <button onClick={() => filterTasks('active')}>Active</button>
                <button onClick={() => filterTasks('done')}>Completed</button>
            </div>
        </div>
    )

}

