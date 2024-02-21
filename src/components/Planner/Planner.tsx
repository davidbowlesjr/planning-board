import { useState } from "react";
import Board from "../Board/Board";
import Header from "../Header/Header";
import Homebar from "../Homebar/Homebar";
import { Project } from "../../Types/Project";
import { Task } from "../../Types/Task";
import { Lane as LaneType } from "../../Types/Lane";
import Navbar from "../Navbar/Navbar";

type NavbarProps = {
    projects: Project[]
    updateProject(project: Project): void
}


export default function Planner({ projects, updateProject }: NavbarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [currentProject, setCurrentProject] = useState(projects[0])

    function saveNewTask(taskName: string, taskDescription: string, laneId: number) {
        var id = currentProject.tasks.length + 1
        var newTask: Task =
        {
            "id": id,
            "title": taskName,
            "body": taskDescription,
            "laneId": laneId
        }

        let updatedCurrentProject = currentProject
        updatedCurrentProject.tasks = [...currentProject.tasks, newTask]
        setCurrentProject(updatedCurrentProject)
        updateProject(currentProject)
        console.log(currentProject.tasks)
        //TODO: SAVE TASK API
    }

    function updateTask(task: Task) {
        // var taskIndex = tasks.findIndex((t => t.id == task.id));
        var updatedProject = currentProject
        updatedProject.tasks = [...currentProject.tasks.filter((t) => t.id != task.id), task]
        //TODO: Make updatedTask not automatically save
        setCurrentProject(currentProject)
        updateProject(currentProject)
    }

    function deleteTask(task: Task) {
        console.log("delete task called: ", task.id)
        let updatedProject = currentProject
        updatedProject.tasks = currentProject.tasks.filter((t) => t.id != task.id)

        setCurrentProject(updatedProject)
        updateProject(currentProject)
        console.log("delete task called", currentProject)
        //TODO: DELETE TASK API
    }

    //TODO: Create Lane
    function createLane(lane: LaneType) {

        let updatedProject = currentProject
        updatedProject.lanes = [...updatedProject.lanes, lane]
        updatedProject.lanes.sort((a, b) => a.id - b.id);
        setCurrentProject(updatedProject)
        updateProject(currentProject)
    }

    function updateLane(lane: LaneType) {
        console.log(lane)
        let updatedProject = currentProject

        updatedProject.lanes = updatedProject.lanes.filter(l => l.id != lane.id);
        updatedProject.lanes.push(lane)
        updatedProject.lanes.sort((a, b) => a.id - b.id);

        setCurrentProject(
            updatedProject
        )
        console.log(currentProject)

        updateProject(currentProject)
    }

    function flipNavbar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (

        <>
            <Homebar flipNavbar={flipNavbar}></Homebar>
            {/* <!-- Side Navigation --> */}
            <div className="relative min-h-screen md:flex">
                {isSidebarOpen ?
                    (
                        <Navbar projects={projects} setCurrentProject={setCurrentProject}></Navbar>
                    )
                    : null}

                 {/* <!-- Current Project --> */}
                <div className="flex-1 p-5">
                    <Header title={currentProject.title}></Header>
                    <Board
                        project={currentProject}
                        saveNewTask={saveNewTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        createLane={createLane}
                        updateLane={updateLane}
                        updateProject={updateProject}
                    >
                    </Board>
                </div>

            </div>
        </>
    )




}