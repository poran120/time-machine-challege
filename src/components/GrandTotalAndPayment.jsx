/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomInput from "../shared/CustomInput";

const GrandTotalAndPayment = ({ projects }) => {
  const [payment, setPayment] = useState(0);

  const calculateTotalTime = (projects) => {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalTasks = 0;

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        totalHours += parseInt(task.hours, 10);
        totalMinutes += parseInt(task.minutes, 10);
      });
      totalTasks += project.tasks.length;
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    const totalDecimalHours = totalHours + totalMinutes / 60;
    const averageHours =
      totalTasks > 0 ? (totalDecimalHours / totalTasks).toFixed(2) : 0;

    return {
      totalHours,
      totalMinutes,
      totalDecimalHours,
      totalTasks,
      averageHours,
    };
  };

  const { totalHours, totalMinutes, totalDecimalHours, totalTasks } =
    calculateTotalTime(projects);

  const paymentForHours = (payment * totalDecimalHours).toFixed(2);

  return (
    <div className="text-center">
      <span className="text-3xl font-bold">Grand Total</span>
      <br />
      <span>
        Projects: {projects.length}, Tasks: {totalTasks}
      </span>
      <br />
      <span>
        {totalHours}h, {totalMinutes} minutes
      </span>
      <br />
      <span>Grand Total: {totalDecimalHours.toFixed(2)} hours</span>
      <br />
      <div className="mt-10">
        <CustomInput
          label={"Pay for an hour"}
          name={"payForAnHour"}
          placeholder={"Enter Your Payment"}
          onChange={(e) => {
            setPayment(parseFloat(e.target.value));
          }}
        />
      </div>
      <span className="text-2xl">
        Your Total Payment: ${paymentForHours || 0}
      </span>
    </div>
  );
};

export default GrandTotalAndPayment;
