import { schema, FormFieldsElement, DataFormFields } from "../util/const";
import { ValidationError } from "yup";
import { useDispatch } from "react-redux";
import { addDataForm } from "../store/slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormErrors = Record<string, string>;

export function UncontrolledForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrors>({});
  const addData = (data: DataFormFields) => {
    dispatch(addDataForm(data));
  };

  const handlerSubmit: React.FormEventHandler<
    HTMLFormElement & FormFieldsElement
  > = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { name, age, email, gender, isAccept, password, passwordConfirm } =
      form;

    try {
      const formData = schema.validateSync(
        {
          name: name.value,
          age: Number(age.value),
          email: email.value,
          gender: gender.value,
          isAccept: isAccept.checked,
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        },
        { abortEarly: false }
      );
      addData(formData);
      navigate("/", { replace: true });
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        const formErrors: FormErrors = {};
        e.inner.forEach((err) => {
          if (err.path && !formErrors[err.path]) {
            formErrors[err.path] = err.message;
          }
        });
        setErrors(formErrors);
      }
    }
    //form.reset();
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <form className="form" onSubmit={handlerSubmit} noValidate>
        <label>
          Name
          <input name="name" type="text" required />
          <p>{errors.name ? errors.name : ""}</p>
        </label>
        <label>
          Age
          <input name="age" type="test" required />
          <p>{errors.age ? errors.age : ""}</p>
        </label>
        <label>
          E-mail
          <input name="email" type="email" required />
          <p>{errors.email ? errors.email : ""}</p>
        </label>
        <label>
          Password
          <input name="password" type="text" required />
          <p>{errors.password ? errors.password : ""}</p>
        </label>
        <label>
          Confirm Password
          <input name="passwordConfirm" type="text" required />
          <p>{errors.passwordConfirm ? errors.passwordConfirm : ""}</p>
        </label>
        <div className="gender">
          <label>
            <input name="gender" type="radio" value="male" required />
            Male
          </label>
          <label>
            <input name="gender" type="radio" value="female" />
            Female
          </label>
        </div>
        <p>{errors.gender ? errors.gender : ""}</p>
        <label>
          accept Terms and Conditions
          <input name="isAccept" type="checkbox" required />
          <p>{errors.isAccept ? errors.isAccept : ""}</p>
        </label>

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
