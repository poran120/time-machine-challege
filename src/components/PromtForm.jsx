/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomInput from "../shared/CustomInput";

const PromtForm = ({ onSubmit }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    projectTitle: "",
    hours: "",
    minutes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    if (formData.hours === "" || formData.minutes === "") {
      setError("Please enter your working hours and minutes");
      return;
    } else {
      setError("");
    }
    onSubmit(formData);
    setFormData({ projectName: "", projectTitle: "", hours: "", minutes: "" });
  };

  return (
    <form onSubmit={handleDataSubmit} className="flex flex-col gap-y-20">
      <CustomInput
        label="Project Name"
        name="projectName"
        placeholder="Project Name"
        value={formData.projectName}
        onChange={handleChange}
      />
      <CustomInput
        label="Title"
        name="projectTitle"
        placeholder="Enter Your Project Title"
        value={formData.projectTitle}
        onChange={handleChange}
      />
      <CustomInput
        label="Hours"
        name="hours"
        type="number"
        placeholder="Enter Your Working Hours"
        value={formData.hours}
        onChange={handleChange}
        error={formData.hours === "" ? error : null}
      />
      <CustomInput
        label="Minutes"
        name="minutes"
        type="number"
        placeholder="Enter Your Working Minutes"
        value={formData.minutes}
        onChange={handleChange}
        error={formData.minutes === "" ? error : null}
      />
      <div className="flex items-center justify-center w-full">
        <button
          type="submit"
          className="py-2 border w-full bg-sky-200 font-bold rounded-lg"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default PromtForm;
