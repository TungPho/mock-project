import React from "react";
import { CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
const SubmittedForm = ({ setFormData, setErrors, setSubmitted }) => {
  const resetForm = () => {
    setFormData({
      name: "",
      temperature: "",
      symptoms: [],
      contact_with_covid: null,
    });
    setErrors({});
    setSubmitted(false);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Declaration Submitted Successfully
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the health declaration form.
        </p>
        <NavLink
          to={"/data"}
          onClick={resetForm}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Records Table
        </NavLink>
      </div>
    </div>
  );
};

export default SubmittedForm;
