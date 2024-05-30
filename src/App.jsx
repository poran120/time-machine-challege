import { useState } from "react";
import "./App.css";
import ProjectList from "./components/ProjectList";
import PromtForm from "./components/PromtForm";
import GrandTotalAndPayment from "./components/GrandTotalAndPayment";

function App() {
  const [projects, setProjects] = useState([]);
  console.log(projects, "existing projects");

  const handleDataSubmit = (data) => {
    const existingProjectIndex = projects.findIndex(
      (project) => project.projectName === data.projectName
    );

    if (existingProjectIndex !== -1) {
      const updatedProjects = projects.map((project, index) =>
        index === existingProjectIndex
          ? {
              ...project,
              tasks: [
                ...project.tasks,
                {
                  projectTitle: data.projectTitle,
                  hours: data.hours,
                  minutes: data.minutes,
                },
              ],
            }
          : project
      );
      setProjects(updatedProjects);
    } else {
      setProjects([
        ...projects,
        {
          projectName: data.projectName,
          tasks: [
            {
              projectTitle: data.projectTitle,
              hours: data.hours,
              minutes: data.minutes,
            },
          ],
        },
      ]);
    }
  };

  return (
    <main className="max-w-screen-2xl mx-auto px-5 py-5">
      {projects?.length > 0 && (
        <h1 className="text-center text-white font-medium text-2xl">
          Count Your Important Working Time
        </h1>
      )}
      <section className="grid grid-cols-5 gap-5 mt-10">
        {/* == Form submit section for the project name, title, hour, and minutes == */}
        <div
          className={`${
            projects?.length > 0 ? `col-span-1` : `col-span-5 w-80 mx-auto`
          }`}
        >
          <PromtForm onSubmit={handleDataSubmit} />
        </div>
        {/* == Show project list and delete existing project == */}
        <div
          className={`col-span-3 ${projects?.length > 0 ? `block` : `hidden`}`}
        >
          <ProjectList formData={projects} setProjects={setProjects} />
        </div>
        {/* == Grand total and payment section == */}
        <div
          className={`col-span-1 ${projects?.length > 0 ? `block` : `hidden`}`}
        >
          <GrandTotalAndPayment projects={projects} />
        </div>
      </section>
    </main>
  );
}

export default App;
