import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addDataForm } from "../store/formDataSlice";
import { useNavigate } from "react-router-dom";
import { schema } from "../util/validationSchema";
import { FormData2 } from "../util/types";
import { RootState } from "../store/store";
import { fileToBase64 } from "../util/fileToBase64";

export function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);

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

  const onSubmit = async (data: FormData2) => {
    const base64Picture = await fileToBase64(data.image[0]);
    dispatch(addDataForm({ ...data, image: base64Picture }));
    reset();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          First Name
          <input {...register("name")} />
          <p>{errors.name?.message}</p>
        </label>
        <label htmlFor="age">
          Age
          <input {...register("age")} />
          <p>{errors.age?.message?.split(",")[0]}</p>
        </label>
        <label htmlFor="email">
          Email
          <input {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label htmlFor="password">
          Password
          <input {...register("password")} type="text" />
          <p>{errors.password?.message}</p>
        </label>
        <label htmlFor="passwordConfirm">
          Confirm Password
          <input {...register("passwordConfirm")} type="text" />
          <p>{errors.passwordConfirm?.message}</p>
        </label>
        <label htmlFor="image">
          Upload image
          <input {...register("image")} type="file" accept=".png, jpeg, jpg" />
          <p>{errors.image?.message}</p>
        </label>
        <label htmlFor="country">
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
          <label htmlFor="male">
            <input {...register("gender")} type="radio" value="male" />
            Male
          </label>
          <label htmlFor="female">
            <input {...register("gender")} type="radio" value="female" />
            Female
          </label>
        </div>
        <p>{errors.gender?.message}</p>
        <label htmlFor="isAccept">
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
