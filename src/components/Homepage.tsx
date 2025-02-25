import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataFormFields } from "../util/types";
import { RootState } from "../store/store";

export function HomePage() {
  const stateData = useSelector((state: RootState) => state.form);
  const formData = stateData.form as DataFormFields;
  const isData = Boolean(Object.keys(formData).length);

  return (
    <div>
      <h1 className="title">Select a form</h1>
      <div className="wrapper">
        <NavLink to="/UncontrolledForm">Uncontrolled Form</NavLink>
        <NavLink to="/ReactHookForm">React Hook Form</NavLink>
      </div>
      {isData && (
        <div className="form-show">
          <span className="field">Name: {formData.name}</span>
          <span className="field">Age: {formData.age}</span>
          <span className="field">E-mail: {formData.email}</span>
          <span className="field">Password: {formData.password}</span>
          <span className="field">Gender: {formData.gender}</span>
          <span className="field">Country: {formData.country}</span>
          <div className="field">
            Image: <img src={formData.image} alt="img" style={{ width: '100%', height: '100%' }}/>
          </div>
        </div>
      )}
    </div>
  );
}
