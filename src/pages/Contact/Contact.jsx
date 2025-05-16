import Form from "../../Components/Form/Form.jsx";
import styles from "./Contact.module.css";

const sections = [
  {
    label: "First Name: *",
    name: "firstname",
    inputType: "text",
    placeholder: "Enter your First Name",
    errorMessage: "Please enter your first name!",
    validate: true,
  },
  {
    label: "Last Name: *",
    name: "lastname",
    inputType: "text",
    placeholder: "Enter your Last Name",
    errorMessage: "Please enter your last name!",
    validate: true,
  },
  {
    label: "Email: *",
    name: "email",
    inputType: "email",
    placeholder: "Enter your Email Address",
    errorMessage: "Please enter your email address!",
    validate: true,
  },
  {
    label: "Order Number: ",
    name: "orderNumber",
    inputType: "text",
    placeholder: "Enter your Order Number",
    validate: false,
  },
  {
    label: "Subject: *",
    name: "subject",
    inputType: "subject",
    placeholder: "Choose a subject",
    errorMessage: "Please specify the subject of inquiry!",
    validate: true,
    options: [
      { value: "", optionLabel: "Choose a Subject" },
      { value: "general", optionLabel: "General" },
      { value: "order", optionLabel: "Order" },
      { value: "tracking", optionLabel: "Tracking" },
      { value: "technical", optionLabel: "Technical" },
      { value: "feedback", optionLabel: "Feedback" },
      { value: "other", optionLabel: "Other" },
    ],
  },
  {
    label: "Message: *",
    name: "message",
    inputType: "textarea",
    placeholder: "Enter your message",
    errorMessage: "Please enter your message!",
    validate: true,
  },
];

const Contact = () => {
  return (
    <>
      <div className={styles.formRootContainer}>
        <div className={styles.formContainer}>
          <h1>Contact</h1>
          <Form
            sections={sections}
            submitButtonText={"Send Message"}
            legendText={"Contact Information"}
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
