import styles from "./Form.module.css";
import Button from "../Button/Button.jsx";
import { useEffect, useState } from "react";

// Form usage explained at bottom

const Form = ({ sections }) => {
  const [inputData, setInputData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [isInEditMode, setIsInEditMode] = useState(false);

  // Get the forms input fields and set their key values on load-in and submission.
  useEffect(() => {
    resetForm();
  }, [sections]);

  const handleValidation = () => {
    const errors = {};
    let isValid = true;

    sections.map((item) => {
      const input = inputData[item.name];

      if (!input.trim() && item.validate) {
        isValid = false;
        errors[item.name] = item.errorMessage;
        // Email
      } else if (item.inputType === "email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) {
          isValid = false;
          errors[item.name] = "Please enter a valid email address!";
        }
        // Phone Number
      } else if (item.inputType === "tel") {
        if (input.trim().length !== 8) {
          isValid = false;
          errors[item.name] = "Phone Number must be 8 digits!";
        }
        // Card Number
      } else if (item.name === "cardNumber") {
        if (/^\d{13,19}$/.test(input)) {
          isValid = false;
          errors[item.name] = "Please enter a valid card number";
        }
        // Card CvC
      } else if (item.name === "cvc") {
        if (/^\d{3,4}$/.test(input)) {
          isValid = false;
          errors[item.name] = "Please enter a valid cvc";
        }
        // Card Expiry Date
      } else if (item.name === "expiryDate") {
        if (/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/.test(input)) {
          isValid = false;
          errors[item.name] = "Please enter a valid expiry date";
        }
      } else {
        errors[item.name] = "";
      }
    });
    setErrorMessages(errors);

    return isValid;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const resetForm = () => {
    const data = {};
    sections.map((item) => {
      data[item.name] = "";
    });
    setInputData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = handleValidation();

    if (!isFormValid) {
      return;
    } else if (!isInEditMode) {
    } else {
    }

    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {sections.map((item) => {
          const inputType = item.inputType;

          return (
            <div className={styles.formSectionCategory} key={item.name}>
              <label htmlFor={item.name}>{item.label}</label>

              {(() => {
                // Text, tel, number, or email field
                if (
                  inputType === "text" ||
                  inputType === "tel" ||
                  inputType === "number" ||
                  inputType === "email"
                ) {
                  return (
                    <input
                      type={item.inputType}
                      name={item.name}
                      id={item.name}
                      placeholder={item.placeholder}
                      value={inputData[item.name] || ""}
                      onChange={onChange}
                    />
                  );
                }

                // Subject -> options Field
                else if (inputType === "subject") {
                  return (
                    <select
                      name={item.name}
                      id={item.name}
                      value={inputData[item.name] || ""}
                      onChange={onChange}
                    >
                      {item.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.optionLabel}
                        </option>
                      ))}
                    </select>
                  );
                }

                // Textarea Field
                else if (inputType === "textarea") {
                  return (
                    <textarea
                      name={item.name}
                      id={item.name}
                      placeholder={item.placeholder}
                      value={inputData[item.name] || ""}
                      onChange={onChange}
                    ></textarea>
                  );
                }

                // Fallback
                else {
                  return null;
                }
              })()}

              <p>{errorMessages[item.name]}</p>
            </div>
          );
        })}
        <div>
          <Button buttonText={"Send Message"} />
        </div>
      </form>
    </div>
  );
};

export default Form;

// How to use the Form with a passed array
// Array consists of objects which consists of:
//
// {
//   label: "Label text: *",
//   name: "name",
//   inputType: "text", "email", "tel", "select", "number" or "textarea",
//   placeholder: "Specified placeholder",
//   validate: "true" or "false"

//   - Do not include errorMessage if the filed should not be validated
//   errorMessage: "Error message to be displayed on validation",

//   - if inputType === "select", it also needs the option key,
//     consisting of an array of objects.
//   options: [
//     { value: "", optionLabel: "Choose a Subject" },
//     { value: "general", optionLabel: "optionText" },
//     { value: "order", optionLabel: "optionText" },
//     ...
//   ],
// },
//
// It also validates if "name"-key = cardNumber, cvc and expiryDate
