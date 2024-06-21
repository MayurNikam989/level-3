import React from "react";
import Formfield from "./Formfield";

const AdditionalForm = ({ questions, handleChange, formValues }) => {
  return (
    <>
      {questions.map((question) => (
        <Formfield
          key={question.id}
          label={question.question}
          type="text"
          name={question.id}
          value={formValues[question.id] || ""}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

export default AdditionalForm;
