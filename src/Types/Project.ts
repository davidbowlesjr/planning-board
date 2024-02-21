import { Lane } from "./Lane"
import { Task } from "./Task"

export type Project = {
    id:number,
    title:string
    lanes: Lane[]
    tasks: Task[]
}