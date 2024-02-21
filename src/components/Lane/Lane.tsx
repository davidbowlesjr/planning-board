import { Dispatch } from 'react';
import Task from '../Task/Task';
import './Lane.css'
import { Lane as LaneType } from '../../Types/Lane';
import { Task as TaskType } from '../../Types/Task';

type LaneProps = {
 id :number;
 title: string;
 tasks: TaskType[] ,
 isEditable: boolean
 handleOnDragStart:(event:React.DragEvent, id: number) => void
 handleOnDragOver: (event:React.DragEvent) => void
 handleOnDrop: (event:React.DragEvent, laneId:number) => void
 updateLane:(lane:LaneType)=>void
 updateTask:(task:TaskType)=>void
 deleteTask:(task:TaskType) => void
}


function Lane({id, title, tasks, isEditable, handleOnDragStart, handleOnDragOver, handleOnDrop, updateLane, updateTask, deleteTask}:LaneProps){

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        
        //TODO: make better
        if(name == "title"){
            console.log(value)
            var newLane = {
                id:id,
                title:value
            }
            updateLane(newLane)
        }
        
      };

    return(
        <div className="bg-blue-400 p-4 rounded-lg backdrop-blur-lg"
        onDragOver={handleOnDragOver}
        onDrop={(event)=> handleOnDrop(event, id)}
        >
            {isEditable?(
            <><button className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none">
                    X
                </button><input className="w-full border border-gray-300"
                    defaultValue={title}
                    onChange={handleChange}
                    name={"title"} /></>
             
             ):
             (<h2 className=" text-center text-xl font-bold mb-4 text-white underline underline-offset-4">{title}</h2>)
             }

            <div>
                {
                    tasks.map((task) => {
                        return( <Task
                          task={task}
                          isEditable={isEditable}
                          handleOnDragStart={handleOnDragStart}
                          handleOnDrop={handleOnDrop}
                          updateTask={updateTask}
                          deleteTask={deleteTask}
                        />
                    )
              })
            }
            </div>
        </div>
    )
}

export default Lane;