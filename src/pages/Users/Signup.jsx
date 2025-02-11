import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../utils/apiTours";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../components/Spinner";

export default function Signup() {
  const { setIsAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Signedup successfully!");
        setIsLoading(false);
        setIsAuth(true);
        navigate("/dashboard");
        reset();
      }
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  const password = watch("password");

  function onSubmit(data) {
    setIsLoading(true);
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8F3DC]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-auto w-[90%] max-w-[450px] rounded-2xl bg-white px-8 py-4 shadow-md sm:max-w-[500px]"
      >
        <h3 className="text-center text-2xl font-semibold">Signup</h3>
        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("name", {
              required: "Please Enter your name",
              pattern: {
                value: /^[A-Za-z]+(?: [A-Za-z]+)*$/i,
                message: "Only letters are allowed!",
              },
            })}
          />
          {errors.name && (
            <p className="px-2 text-lg text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your Email"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="px-2 text-lg text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("password", {
              required: "Password is required!",
              min: {
                value: 8,
                message: "Password must have more than 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number, and special character",
              },
            })}
          />
          {errors.password && (
            <p className="px-2 text-lg text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("passwordConfirm", {
              required: "You must confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.passwordConfirm && (
            <p className="px-2 text-lg text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <button
            className={`w-full cursor-pointer rounded-full bg-[#FFD166] py-2 text-xl transition hover:bg-yellow-500 ${isLoading ? "disabled:cursor-not-allowed disabled:opacity-50" : ""}`}
          >
            {isLoading ? <Spinner size="w-8 h-8" /> : "Signup"}
          </button>
        </div>
        <div className="mt-5">
          <p className="px-2 text-base sm:text-lg">
            Already have an account?{" "}
            <NavLink to="/signin" className="text-[#2D6A4F]">
              Signin
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
