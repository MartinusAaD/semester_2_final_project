import styles from "./Form.module.css";
import Button from "../Button/Button.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firestoreConfig.js";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth.js";

// Form usage explained at bottom
const Form = ({
  sections,
  legendText,
  typeOfForm,
  buttonStyle,
  submitButtonText,
}) => {
  const [inputData, setInputData] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [isInEditMode, setIsInEditMode] = useState(false);

  // Get the forms input fields and set their key values on load-in and submission.
  useEffect(() => {
    resetForm();
  }, [sections]);

  const navigate = useNavigate();

  const { user, signUp, signUpErrors } = useAuth();

  const handleValidation = () => {
    const errors = {};
    let isValid = true;

    sections.map((item) => {
      const input = inputData[item.name];

      if (!String(input).trim() && item.validate) {
        isValid = false;
        errors[item.name] = item.errorMessage;
      }
      // Email
      else if (item.inputType === "email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) {
          isValid = false;
          errors[item.name] = "Please enter a valid email address!";
        }
      }
      // Checkbox
      else if (item.inputType === "checkbox") {
        if (inputData.terms === false) {
          isValid = false;
          errors[item.name] = item.errorMessage;
        }
      }
      // Confirm Password
      else if (item.name === "confirmPassword") {
        if (inputData.password !== inputData.confirmPassword) {
          isValid = false;
          errors[item.name] = "The passwords do not match!";
        }
      }
      // Phone Number
      else if (item.inputType === "tel") {
        if (input.trim().length !== 8) {
          isValid = false;
          errors[item.name] = "Phone Number must be 8 digits!";
        }
      }
      // Card Number
      else if (item.name === "cardNumber") {
        if (/^\d{13,19}$/.test(input)) {
          isValid = false;
          errors[item.name] = item.errorMessage;
        }
      }
      // Card CvC
      else if (item.name === "cvc") {
        if (/^\d{3,4}$/.test(input)) {
          isValid = false;
          errors[item.name] = item.errorMessage;
        }
      }
      // Card Expiry Date
      else if (item.name === "expiryDate") {
        if (/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/.test(input)) {
          isValid = false;
          errors[item.name] = item.errorMessage;
        }
      } else {
        errors[item.name] = "";
      }
    });
    setErrorMessages(errors);

    return isValid;
  };

  // Handle change in general
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle change for checkbox
  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setInputData((prev) => ({ ...prev, [name]: checked }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  // Reset Form
  const resetForm = () => {
    const data = {};
    sections.map((item) => {
      if (item.inputType === "checkbox") {
        data[item.name] = false;
      } else {
        data[item.name] = "";
      }
    });
    setInputData(data);
  };

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    const isFormValid = handleValidation();

    // Checks validation
    if (!isFormValid) {
      return;
    }

    // For Sign-up purposes
    if (typeOfForm === "signUp") {
      try {
        const userCredential = await signUp(email, password);
        const user = userCredential.user;
        console.log("User has been created!", user);
        setSubmitMessage("Redirecting");

        await setDoc(doc(database, "users", user.uid), {
          ...inputData,
          uid: user.uid,
          createdAt: serverTimestamp(),
        });

        navigate("/verify-email");
        setSubmitMessage("");
      } catch (error) {
        console.log(error.message);
        setSubmitMessage(
          "There was an error creating your account, try again!"
        );
      }
    }

    // For Sign-in purposes
    if (typeOfForm === "signIn") {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          inputData.email,
          inputData.password
        );
        const user = userCredential.user;
        console.log("User has successfully logged in!", user);
        setSubmitMessage("Redirecting");
        navigate("/");
        setSubmitMessage("");
      } catch (error) {
        console.log(error.message);
        setSubmitMessage("User does not exist, try again");
      }
    }

    // Reset Form
    resetForm();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleSubmit(e, inputData.email, inputData.password)}
      noValidate
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{legendText}</legend>
        {sections.map((item) => {
          return (
            <div className={styles.formSectionCategory} key={item.name}>
              {(() => {
                // Text, tel, number, or email field
                if (
                  item.inputType === "text" ||
                  item.inputType === "tel" ||
                  item.inputType === "number" ||
                  item.inputType === "email"
                ) {
                  return (
                    <>
                      <label htmlFor={item.name} title={item.placeholder}>
                        {item.label}
                      </label>
                      <input
                        type={item.inputType}
                        name={item.name}
                        id={item.name}
                        className={styles.input}
                        placeholder={item.placeholder}
                        value={inputData[item.name] || ""}
                        onChange={handleChange}
                      />
                    </>
                  );
                }

                // Password
                else if (item.inputType === "password") {
                  return (
                    <>
                      <label htmlFor={item.name} title={item.placeholder}>
                        {item.label}
                      </label>
                      <input
                        type={item.inputType}
                        name={item.name}
                        id={item.name}
                        className={styles.input}
                        placeholder={item.placeholder}
                        value={inputData[item.name] || ""}
                        onChange={handleChange}
                      ></input>
                    </>
                  );
                }

                // Subject -> options Field
                else if (item.inputType === "subject") {
                  return (
                    <>
                      <label htmlFor={item.name} title={item.placeholder}>
                        {item.label}
                      </label>
                      <select
                        name={item.name}
                        id={item.name}
                        className={styles.input}
                        value={inputData[item.name] || ""}
                        onChange={handleChange}
                      >
                        {item.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.optionLabel}
                          </option>
                        ))}
                      </select>
                    </>
                  );
                }

                // Checkbox
                else if (item.inputType === "checkbox") {
                  return (
                    <div className={styles.checkboxContainer}>
                      <input
                        type={item.inputType}
                        name={item.name}
                        id={item.name}
                        className={styles.inputCheckbox}
                        checked={inputData[item.name] || item.placeholder}
                        onChange={handleChangeCheckbox}
                      />
                      <label htmlFor={item.name} title={item.placeholder}>
                        {item.label}
                      </label>
                    </div>
                  );
                }

                // Textarea Field
                else if (item.inputType === "textarea") {
                  return (
                    <>
                      <label htmlFor={item.name} title={item.placeholder}>
                        {item.label}
                      </label>
                      <textarea
                        name={item.name}
                        id={item.name}
                        className={styles.inputTextArea}
                        placeholder={item.placeholder}
                        value={inputData[item.name]}
                        onChange={handleChange}
                      ></textarea>
                    </>
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
      </fieldset>
      <p>{submitMessage}</p>
      <div>
        <Button className={buttonStyle}>{submitButtonText}</Button>
      </div>
    </form>
  );
};

export default Form;

// How to use the Form with a passed array
// Array consists of objects which consists of:
//
// {
//   label: "Label text: *",
//   name: "name",
//   inputType: "text", "number" "email", "tel", "password", "checkbox" "select", or "textarea",
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
