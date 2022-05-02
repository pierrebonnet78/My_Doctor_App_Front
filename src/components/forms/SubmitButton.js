import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title }) {
  const { handleSubmit, validateForm } = useFormikContext();

  return (
    <Button
      title={title}
      onPress={() => {
        validateForm()
          .then(handleSubmit)
          .catch((error) => {
            console.log("error is", error);
          });
      }}
    />
  );
}

export default SubmitButton;
