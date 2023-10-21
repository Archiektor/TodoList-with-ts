import React, {ChangeEvent, useState} from 'react';
import './TodoList.css';

export type TaskType = {
    id: string
    checked: boolean
    name: string
}

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idx: string) => void
    filterTasks: (filter: `all` | `active` | `done`) => void
    addTask: (taskName: string) => void
}

export const TodoList: React.FC<TodoListType> = ({title, tasks, removeTask, filterTasks, addTask}) => {
    const [value, setValue] = useState<string>('')

    const modifiedAddTask = () => {
        addTask(value);
        setValue('');
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }
    const onInputButtonClickHandler = () => {
        modifiedAddTask()
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        //console.dir(event);
        if (event.ctrlKey && event.key === 'Enter') {
            modifiedAddTask()
        }
    }

    const onAllClick = () => filterTasks('all');
    const onActiveClick = () => filterTasks('active');
    const onDoneClick = () => filterTasks('done');

    return (
        <div className={`todolist`}>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={value} onKeyUp={onKeyPressHandler}/>
                <button onClick={onInputButtonClickHandler}>+</button>
            </div>
            <ul>
                {tasks.map(({id, checked, name}) => {
                    const onRemoveHandler = () => {
                        removeTask(id)
                    }

                    return (
                        <li key={id}><input type="checkbox" checked={checked}/> <span>{name}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClick}>All</button>
                <button onClick={onActiveClick}>Active</button>
                <button onClick={onDoneClick}>Completed</button>
            </div>
        </div>
    )

}

