import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addDataForm } from "../store/formDataSlice";
import { useNavigate } from "react-router-dom";
import { schema } from "../util/validationSchema";
import { DataFormFields } from "../util/types";
import { RootState } from "../store/store";

export function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const addData = (data: DataFormFields) => {
    dispatch(addDataForm(data));
  };

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      gender: "male",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

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
          <input {...register("name")} />
          <p>{errors.name?.message}</p>
        </label>
        <label>
          Age
          <input {...register("age")} />
          <p>{errors.age?.message?.split(",")[0]}</p>
        </label>
        <label>
          Email
          <input {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
          Password
          <input {...register("password")} type="text" />
          <p>{errors.password?.message}</p>
        </label>
        <label>
          Confirm Password
          <input {...register("passwordConfirm")} type="text" />
          <p>{errors.passwordConfirm?.message}</p>
        </label>
        <label>
          Choose country
          <select {...register("country")}>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
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
        <p>{errors.gender?.message}</p>
        <label>
          accept Terms and Conditions
          <input {...register("isAccept")} type="checkbox" />
          <p>{errors.isAccept?.message}</p>
        </label>
        <button type="submit" disabled={!isValid}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}
