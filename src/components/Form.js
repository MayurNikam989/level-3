import React from "react";
import { useState } from "react";
import Formfield from "./Formfield";
import useValidation from "../custom-hooks/useValidation";
import useForm from "../custom-hooks/useForm";
import AdditionalForm from "./AdditionalForm";
import { fetchSurveyQuestions } from "../config/config";

const Form = () => {
  const { formValues, handleChange, setFormValues } = useForm();
  const { validate, errors } = useValidation(formValues);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const handleTopicChange = async (event) => {
    handleChange(event);
    const topic = event.target.value;
    const questions = await fetchSurveyQuestions(topic);
    setAdditionalQuestions(questions);
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (validate()) {
      alert(JSON.stringify(formValues, null, 2));
      setFormValues({
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
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Formfield
          label="Full Name"
          type="text"
          name="fullName"
          value={formValues.fullName}
          onChange={handleChange}
          onBlur={() => {}}
          errors={errors.fullName}
        />

        <Formfield
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          onBlur={() => {}}
          errors={errors.email}
        />

        <Formfield
          label="Survey Topic"
          type="select"
          name="surveyTopic"
          value={formValues.surveyTopic}
          options={["Technology", "Health", "Education"]}
          onChange={handleTopicChange}
          onBlur={() => {}}
          errors={errors.surveyTopic}
        />

        {formValues.surveyTopic === "Technology" && (
          <>
            <Formfield
              label="Favorite Programming Language"
              type="select"
              name="favoriteProgrammingLanguage"
              value={formValues.favoriteProgrammingLanguage}
              options={["JavaScript", "Python", "Java", "C#"]}
              onChange={handleChange}
              onBlur={() => {}}
              errors={errors.favoriteProgrammingLanguage}
            />

            <Formfield
              label="Years of Experience"
              type="number"
              name="yearsOfExperience"
              value={formValues.yearsOfExperience}
              onChange={handleChange}
              onBlur={() => {}}
              errors={errors.yearsOfExperience}
            />
          </>
        )}

        {formValues.surveyTopic === "Health" && (
          <>
            <Formfield
              label="Exercise Frequency"
              type="select"
              name="exerciseFrequency"
              value={formValues.exerciseFrequency}
              options={["Daily", "Weekly", "Monthly", "Rarely"]}
              onChange={handleChange}
              onBlur={() => {}}
              errors={errors.exerciseFrequency}
            />

            <Formfield
              label="Diet Preference"
              type="select"
              name="dietPreference"
              value={formValues.dietPreference}
              options={["Vegetarian", "Vegan", "Non-Vegetarian"]}
              onChange={handleChange}
              onBlur={() => {}}
              errors={errors.dietPreference}
            />
          </>
        )}

        {formValues.surveyTopic === "Education" && (
          <>
            <Formfield
              label="Highest Qualification"
              type="select"
              name="highestQualification"
              value={formValues.highestQualification}
              options={["High School", "Bachelor's", "Master's", "PhD"]}
              onChange={handleChange}
              onBlur={() => {}}
              errors={errors.highestQualification}
            />

            <Formfield
              label="Field of Study"
              type="text"
              name="fieldOfStudy"
              value={formValues.fieldOfStudy}
              onChange={handleChange}
              onBlur={() => {}}
              errors={errors.fieldOfStudy}
            />
          </>
        )}

        <AdditionalForm
          questions={additionalQuestions}
          handleChange={handleChange}
          formValues={formValues}
        />
        {additionalQuestions.map(
          (question, index) =>
            errors[`additionalQuestion${index + 1}`] && (
              <p key={index}>{errors[`additionalQuestion${index + 1}`]}</p>
            )
        )}

        <Formfield
          label="Feedback"
          type="textarea"
          name="feedback"
          value={formValues.feedback}
          onChange={handleChange}
          onBlur={() => {}}
          errors={errors.feedback}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
