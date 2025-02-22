import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addDataForm } from "../store/slice";
import { useNavigate } from "react-router-dom";
import { schema, DataFormFields } from "../util/const";

export function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addData = (data: DataFormFields) => {
    dispatch(addDataForm(data));
  };

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = (data: DataFormFields) => {
    addData(data);
    reset();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name
          <input {...register("firstName")} />
        </label>
        <p>{errors.firstName?.message}</p>
        <label>
          Age
          <input {...register("age")} />
        </label>
        <p>{errors.age?.message}</p>
        <label>
          Email
          <input {...register("email")} />
        </label>
        <div className="gender">
          <label>
            <input {...register("gender")} type="radio" value="male" />
            Male
          </label>
          <label>
            <input {...register("gender")} type="radio" value="female" />
            Female
          </label>
        </div>
        <button type="submit" disabled={!isValid}>SUBMIT</button>
      </form>
    </div>
  );
}
