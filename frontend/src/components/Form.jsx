import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Thermometer, User, Phone } from 'lucide-react';

const HealthDeclarationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    temperature: '',
    symptoms: [],
    covidContact: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const symptomsList = [
    'Cough',
    'Smell/taste impairment',
    'Fever',
    'Breathing difficulties',
    'Body aches',
    'Headaches',
    'Fatigue',
    'Sore throat',
    'Diarrhea',
    'Runny nose'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSymptomChange = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.temperature.trim()) {
      newErrors.temperature = 'Temperature is required';
    } else if (isNaN(formData.temperature) || formData.temperature < 35 || formData.temperature > 45) {
      newErrors.temperature = 'Please enter a valid temperature (35-45°C)';
    }
    
    if (!formData.covidContact) {
      newErrors.covidContact = 'Please answer the COVID-19 contact question';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
     
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      temperature: '',
      symptoms: [],
      covidContact: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Declaration Submitted Successfully</h2>
          <p className="text-gray-600 mb-6">Thank you for completing the health declaration form.</p>
          <button
            onClick={resetForm}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Another Declaration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Declaration Form</h1>
        <p className="text-gray-600">Please complete this form before entering the premises.</p>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline h-4 w-4 mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Temperature Field */}
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-2">
            <Thermometer className="inline h-4 w-4 mr-1" />
            Temperature (°C) *
          </label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            step="0.1"
            min="35"
            max="45"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.temperature ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="36.5"
          />
          {errors.temperature && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.temperature}
            </p>
          )}
        </div>

        {/* Symptoms Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you have any of the following symptoms now or within the last 14 days?
            <span className="text-xs text-gray-500 block mt-1">
              (Even if your symptoms are mild)
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {symptomsList.map((symptom) => (
              <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom)}
                  onChange={() => handleSymptomChange(symptom)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        {/* COVID Contact Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Have you been in contact with anyone who is suspected to have/has been diagnosed with COVID-19 within the last 14 days? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="covidContact"
                value="yes"
                checked={formData.covidContact === 'yes'}
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="covidContact"
                value="no"
                checked={formData.covidContact === 'no'}
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {errors.covidContact && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.covidContact}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Submit Health Declaration
          </button>
        </div>
      </div>

      {/* Form Data Display (for development) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Form Data (for development):</h3>
        <pre className="text-xs text-gray-600 overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HealthDeclarationForm;