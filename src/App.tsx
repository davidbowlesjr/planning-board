
//import Header from './Header/header.tsx'

import './App.css'
import { Project } from './Types/Project.ts'
import { useEffect, useState } from 'react'
import Planner from './components/Planner/Planner.tsx'
import ProjectAPI from './service/ProjectAPI.tsx'

// const test_projects:Project[] = [{
//   id:1,
//   title:"Test Project",
//   lanes: [{
//       id: 1,
//       title: "To Do"
//   },
//   {
//       id: 2,
//       title: "In Progress"
//   },
//   {
//       id: 3,
//       title: "QA"
//   },
//   {
//       id: 4,
//       title: "Done"
//   },]
//   ,
//   tasks:[{
//       "id": 1,
//       "title": "Test Task",
//       "body": "test body asbd ad",
//       "laneId": 1
//   }]
// },
// {
//   id:2,
//   title:"Test Project 2",
//   lanes: [{
//       id: 1,
//       title: "To Do"
//   },
//   {
//       id: 2,
//       title: "In Progress"
//   },
//   {
//       id: 3,
//       title: "Review"
//   },
//   {
//       id: 4,
//       title: "Done"
//   },]
//   ,
//   tasks:[{
//       "id": 1,
//       "title": "Test Task",
//       "body": "test body asbd ad",
//       "laneId": 1
//   }]
// }
// ]




export default function App() {
  const projectService = new ProjectAPI();
  const [projects, setProjects] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await projectService.getProjects(); // Call fetchData method of SampleService
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on component mount


  function updateProject(project:Project){
    setProjects(
    projects.map((p) => {
      if(p.id === project.id)
      {
        return project
      }else{
        return p 
      }
    })
    )
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
        <Planner 
        projects={projects}
        updateProject={updateProject}
        ></Planner>
    </div>
  )
}

