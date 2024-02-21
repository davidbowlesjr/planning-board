import { Dispatch, useState } from 'react'
import './Task.css'

export type Task = {
    "id": number,
    "title": string,
    "body": string,
    "laneId": number
}

type TaskProps = {
    task: Task
    isEditable: boolean
    handleOnDragStart: (event: React.DragEvent, id: number) => void,
    handleOnDrop: (event: React.DragEvent, laneId: number) => void,
    updateTask: (task:Task) => void
    deleteTask: (task: Task) => void
}

export default function Task({ task, isEditable, handleOnDragStart, updateTask,deleteTask }: TaskProps) {
    const [updatedTask, setUpdatedTaskData] = useState<Task>(task);


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        //TODO: make better
        if(name == "title"){

            updatedTask.title = value

            setUpdatedTaskData(updatedTask)
        }

        if(name == "body"){

            updatedTask.body = value

            setUpdatedTaskData(updatedTask)
        }
        updateTask(updatedTask)

        task = updatedTask
      };

    return (<div>
        {isEditable ? (
            <div
                className="overflow-auto relative bg-white border border-gray-400 p-4 rounded-lg mb-5"
            >
                <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
                    onClick={(event) => {
                        event.stopPropagation(); // Prevent the drag event from being triggered when clicking the X button
                        deleteTask(task); // Call your delete function here
                    }}
                >
                    X
                </button> 
                <>
                    <input className="w-full border border-gray-300" 
                    defaultValue={task.title}
                    onChange={handleChange}
                    name={"title"}/>

                    <textarea
                        className="py-3 px-4 block w-full border border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white "
                        rows="3"
                        defaultValue={task.body}
                        onChange={handleChange}
                        name={"body"}
                        />
                </>
            </div>
        ) :
            (
                <div
                    className="overflow-auto relative bg-white border border-gray-400 p-4 rounded-lg mb-5"
                    draggable
                    onDragStart={(event) => handleOnDragStart(event, task.id)}
                >
                    <><h3>{task.title}</h3><p>{task.body}</p></>
                </div>
            )
        }
    </div>
    )
}