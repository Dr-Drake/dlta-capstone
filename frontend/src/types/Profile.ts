export interface Project{
    "id": string;
    "projectName": string;
    "youtube": string;
    "github": string;
    "description": string;
    "technologies": string[]
}

export interface Profile{
    "id": string;
    "name": string;
    "picture": string;
    "role": string;
    "bio": string;
    "location": string;
    "projects"?: Project[];
}