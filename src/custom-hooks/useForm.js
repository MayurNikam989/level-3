import { useState } from "react";
const useForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
    additionalQuestions: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return {
    formValues,
    setFormValues,
    handleChange,
  };
};

export default useForm;
