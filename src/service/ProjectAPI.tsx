import { useEffect } from "react";
import { Project } from "../Types/Project";

export default class ProjectAPI{
    api_url = "http://localhost:3000/projects"


    async getProjects(){
        try {
            const response = await fetch(this.api_url);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
        }
}


