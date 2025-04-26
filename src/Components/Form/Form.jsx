import styles from "./Form.module.css";
import Button from "../Button/Button.jsx";

const Form = ({ sections }) => {
  console.log(sections);
  console.log({ sections });

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        {sections.map((item) => {
          const inputType = item.inputType;

          if (inputType === "text" || inputType === "email") {
            return (
              <div className={styles.formSectionCategory} key={item.label}>
                <label htmlFor={item.label}>{item.text}</label>
                <input
                  id={item.label}
                  type={item.inputType}
                  placeholder={item.placeholder}
                />
              </div>
            );
          } else if (inputType === "dropdown") {
            return (
              <div className={styles.formSectionCategory} key={item.label}>
                <label htmlFor={item.label}>{item.text}</label>
                <select name={item.label} id={item.label}>
                  {item.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (inputType === "textarea") {
            return (
              <div className={styles.formSectionCategory} key={item.label}>
                <label htmlFor={item.label}>{item.text}</label>
                <textarea
                  name={item.label}
                  id={item.label}
                  placeholder={item.placeholder}
                ></textarea>
              </div>
            );
          }
        })}
        <div>
          <Button buttonText={"Submit Message"} />
        </div>
      </form>
    </div>
  );
};

export default Form;
