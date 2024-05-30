/* eslint-disable react/prop-types */
import { IconTrash } from "@tabler/icons-react";

const ProjectList = (props) => {
  const { formData, setProjects } = props;

  const handleDeleteAllData = () => {
    if (window.confirm("Are you sure you want to delete all data?")) {
      setProjects([]);
    }
  };

  const handleDeleteTask = (projectIndex, taskIndex) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const newProjects = formData.map((project, i) => {
        if (i === projectIndex) {
          const updatedTasks = project.tasks.filter((_, j) => j !== taskIndex);
          return { ...project, tasks: updatedTasks };
        }
        return project;
      });
      setProjects(newProjects);
    }
  };

  const calculateTotalTime = (tasks) => {
    let totalHours = 0;
    let totalMinutes = 0;

    tasks.forEach((task) => {
      totalHours += parseInt(task.hours, 10);
      totalMinutes += parseInt(task.minutes, 10);
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return { totalHours, totalMinutes };
  };

  return (
    <section>
      {formData?.map((project, projectIndex) => {
        const { totalHours, totalMinutes } = calculateTotalTime(project.tasks);
        return (
          <div key={projectIndex} className="mb-6">
            <div className="flex items-center justify-between pb-3 border-b-2">
              <span className="text-2xl">{project?.projectName}</span>
              <span>
                {totalHours} Hours, {totalMinutes} Minutes
              </span>
            </div>

            <div className="ml-4">
              {project.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className="flex items-center justify-between border-gray-200 pt-3 mt-3"
                >
                  <span>{task?.projectTitle}</span>
                  <div className="flex items-center gap-x-2">
                    <span>{task?.hours} Hours, </span>
                    <span>{task?.minutes} Minutes</span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(projectIndex, taskIndex)}
                  >
                    <IconTrash stroke={2} height={20} width={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {formData?.length > 0 && (
        <div className="flex items-center justify-center mt-20">
          <button
            className="bg-sky-400 px-5 py-2"
            onClick={handleDeleteAllData}
          >
            Clear All Data
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectList;
