import { schema } from "../util/validationSchema";
import { FormFieldsElement } from "../util/types";
import { ValidationError } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addDataForm } from "../store/formDataSlice";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { RootState } from "../store/store";
import { fileToBase64 } from "../util/fileToBase64";

type FormErrors = Record<string, string>;

export function UncontrolledForm() {
  const imageRef = useRef<HTMLInputElement>(null);
  const countries = useSelector((state: RootState) => state.countries);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrors>({});

  const handlerSubmit: React.FormEventHandler<
    HTMLFormElement & FormFieldsElement
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      const formData = schema.validateSync(
        {
          name: form.name.value,
          age: Number(form.age.value),
          email: form.email.value,
          gender: form.gender.value,
          isAccept: form.isAccept.checked,
          password: form.password.value,
          passwordConfirm: form.passwordConfirm.value,
          country: form.country.value,
          image: imageRef.current?.files,
        },
        { abortEarly: false }
      );
      if (!imageRef.current?.files) return;
      const image = imageRef.current?.files[0];

      fileToBase64(image).then((base64String) => {
        const submitData = { ...formData, image: base64String };
        dispatch(addDataForm(submitData));
        navigate("/", { replace: true });
      });
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
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <form className="form" onSubmit={handlerSubmit} noValidate>
        <label htmlFor="name">
          Name
          <input name="name" type="text" required />
          <p>{errors.name ? errors.name : ""}</p>
        </label>
        <label htmlFor="age">
          Age
          <input name="age" type="test" required />
          <p>{errors.age ? errors.age : ""}</p>
        </label>
        <label htmlFor="email">
          E-mail
          <input name="email" type="email" required />
          <p>{errors.email ? errors.email : ""}</p>
        </label>
        <label htmlFor="password">
          Password
          <input name="password" type="text" required />
          <p>{errors.password ? errors.password : ""}</p>
        </label>
        <label htmlFor="passwordConfirm">
          Confirm Password
          <input name="passwordConfirm" type="text" required />
          <p>{errors.passwordConfirm ? errors.passwordConfirm : ""}</p>
        </label>
        <label htmlFor="image">
          Upload image
          <input
            name="image"
            ref={imageRef}
            type="file"
            accept=".png, jpeg, jpg"
          />
        </label>
        <p>{errors.image ? errors.image : ""}</p>
        <label htmlFor="country">
          Choose country
          <select name="country">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <div className="gender">
          <label htmlFor="mail">
            <input name="gender" type="radio" value="male" required />
            Male
          </label>
          <label htmlFor="female">
            <input name="gender" type="radio" value="female" />
            Female
          </label>
        </div>
        <p>{errors.gender ? errors.gender : ""}</p>
        <label htmlFor="isAccept">
          accept Terms and Conditions
          <input name="isAccept" type="checkbox" required />
          <p>{errors.isAccept ? errors.isAccept : ""}</p>
        </label>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
