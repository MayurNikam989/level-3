import { useState, useEffect } from "react";

const useValidation = (values) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const validate = () => {
    const newErrors = {};

    if (!values.fullName) newErrors.fullName = "Full Name is required";
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!values.surveyTopic) newErrors.surveyTopic = "Survey Topic is required";
    if (values.surveyTopic === "Technology") {
      if (!values.favoriteProgrammingLanguage)
        newErrors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required";
      if (!values.yearsOfExperience) {
        newErrors.yearsOfExperience = "Years of Experience is required";
      } else if (values.yearsOfExperience <= 0) {
        newErrors.yearsOfExperience =
          "Years of Experience must be greater than 0";
      }
    }
    if (values.surveyTopic === "Health") {
      if (!values.exerciseFrequency)
        newErrors.exerciseFrequency = "Exercise Frequency is required";
      if (!values.dietPreference)
        newErrors.dietPreference = "Diet Preference is required";
    }
    if (values.surveyTopic === "Education") {
      if (!values.highestQualification)
        newErrors.highestQualification = "Highest Qualification is required";
      if (!values.fieldOfStudy)
        newErrors.fieldOfStudy = "Field of Study is required";
    }
    if (!values.feedback) {
      newErrors.feedback = "Feedback is required";
    } else if (values.feedback.length < 50) {
      newErrors.feedback = "Feedback must be at least 50 characters";
    }

    // Validate additional questions
    for (let key in values) {
      if (key.startsWith("additionalQuestion") && !values[key]) {
        newErrors[key] = "This field is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validate, errors };
};

export default useValidation;
