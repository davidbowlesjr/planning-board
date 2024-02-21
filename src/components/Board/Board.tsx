import { Dispatch, useState } from 'react'
import Lane from '../Lane/Lane'
import { Lane as LaneType } from '../../Types/Lane'
import './Board.css'
import CreateTask from '../CreateTask/CreateTask'
import { Project } from '../../Types/Project'


export type Task = {
    "id": number,
    "title": string,
    "body": string,
    "laneId": number
}

type BoardProps = {
    project:Project
    saveNewTask(taskName: string, taskDescription: string, laneId:number) : void
    updateTask(task: Task):void
    deleteTask(task:Task):void
    createLane(lane:LaneType):void
    updateLane(lane:LaneType):void
    updateProject(project:Project):void
}

function handleOnDragStart(event:React.DragEvent, id: number){
    console.log("Drag event started: ", id.toString())
    event.dataTransfer.setData("id", id.toString())
    console.log("dataTransfer: ", event.dataTransfer.getData("id"))
}

function handleOnDragOver(event:React.DragEvent){
    console.log("handleOnDragOver")
    event.preventDefault();
}


export default function Board({project, saveNewTask, updateTask, deleteTask, createLane, updateLane, updateProject}:BoardProps){
    const [isEditable, setIsEditable] = useState(false)

    function handleOnDrop(event:React.DragEvent, laneId:number){
        
        const id = event.dataTransfer.getData("id")
        const task = project.tasks.find((task)=> task.id === parseInt(id))

        console.log("handleOnDrop: ", laneId , id, task)

        if (task){
            const newTask = project.tasks.filter((task)=> task.id !== parseInt(id))
           
            project.tasks = newTask.concat({...task, laneId})
            updateProject(project)
        }
    }

    function onSaveBoard(){
        setIsEditable(!isEditable)
        //TODO: API Changes
    }

    return(
        <div className="grid grid-cols-4 gap-4">
            {
                project.lanes.map((lane) => {
                    return <Lane 
                    key ={lane.id} 
                    id = {lane.id} 
                    title = {lane.title} 
                    tasks = {project.tasks.filter((task) => task.laneId === lane.id)}
                    isEditable = {isEditable}
                    handleOnDragStart = {handleOnDragStart}
                    handleOnDragOver = {handleOnDragOver} 
                    handleOnDrop = {handleOnDrop}
                    updateLane={updateLane}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    />
                })
            }
            <div className="flex justify-between">
                {isEditable?(
                <button 
                className="bg-pink-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                relative left-0"
                onClick={onSaveBoard}
                >Save Board</button>
                ):(
                <button 
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                relative left-0"
                onClick={()=>setIsEditable(!isEditable)}
                >Update Board</button>
                )}
                
                <CreateTask lanes={project.lanes} saveNewTask={saveNewTask}></CreateTask>
            </div>
        </div>
    )
}