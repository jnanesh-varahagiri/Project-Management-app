import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";

import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });

  function handleStartAddProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  }

  //to save the form
  function handleAddProject(projectTitle, projectDescripton, projectDueDate) {
    setProjectsState((prevState) => {
      const newProject = {
        title: projectTitle,
        description: projectDescripton,
        due_date: projectDueDate,
        id: Math.random(),
      };
      console.log(newProject);
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  //to cancel the project
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleAddTask(task) {
    setProjectsState((prevState) => {
      const newTask = {
        text : task,
        id:Math.random(),
        projectId : prevState.selectedProjectId
      };
      // console.log(newProject);
      return {
        ...prevState,
        tasks : [newTask,...prevState.tasks]
      };
    });

  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }


  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    ></SelectedProject>
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onSave={handleAddProject}
        onCancel={handleCancelAddProject}
      ></NewProject>
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected onStartAdd={handleStartAddProject}></NoProjectSelected>
    );
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAdd={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        
      ></ProjectSidebar>

      {content}
    </main>
  );
}

export default App;
