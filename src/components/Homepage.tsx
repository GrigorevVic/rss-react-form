import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataFormFields } from "../util/const";
import { RootState } from '../store/index';

export function HomePage() {
  const stateData = useSelector((state: RootState) => state.form);
  const formData  = stateData.form as DataFormFields;

  return (
    <div>
      <h1>Выберите форму</h1>
      <div className="wrapper">
        <NavLink to="/UncontrolledForm">Uncontrolled Form</NavLink>
        <NavLink to="/ReactHookForm">React Hook Form</NavLink>
      </div>
      <div className="form-show">
        {formData.name && (
          <span className="field">name: {formData.name}</span>
        )}
        {formData.age && (
          <span className="field">age: {formData.age}</span>
        )}
        {formData.email && (
          <span className="field">email: {formData.email}</span>
        )}
        {formData.gender && (
          <span className="field">gender: {formData.gender}</span>
        )}
      </div>
    </div>
  );
}
