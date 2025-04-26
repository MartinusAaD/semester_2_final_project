import Form from "../Components/Form/Form.jsx";
import styles from "./Contact.module.css";

const Contact = () => {
  const sections = [
    {
      text: "First Name: *",
      label: "firstname",
      inputType: "text",
      placeholder: "Enter your First Name",
    },
    {
      text: "Last Name: *",
      label: "lastname",
      inputType: "text",
      placeholder: "Enter your Last Name",
    },
    {
      text: "Email: *",
      label: "email",
      inputType: "email",
      placeholder: "Enter your Email Address",
    },
    {
      text: "Order Number: ",
      label: "orderNumber",
      inputType: "text",
      placeholder: "Enter your Order Number",
    },
    {
      text: "Subject: *",
      label: "subject",
      inputType: "dropdown",
      placeholder: "Choose a subject",
      options: [
        { value: "", label: "Choose a Subject" },
        { value: "general", label: "General" },
        { value: "order", label: "Order" },
        { value: "tracking", label: "Tracking" },
        { value: "technical", label: "Technical" },
        { value: "feedback", label: "Feedback" },
      ],
    },
    {
      text: "Inquiry: *",
      label: "inquiry",
      inputType: "textarea",
      placeholder: "Enter your inquiry",
    },
    {
      text: "Id:",
      label: "id",
      inputType: "hidden",
      placeholder: "Automatically Generate ID",
    },
  ];

  return (
    <>
      <Form sections={sections} />
    </>
  );
};

export default Contact;
