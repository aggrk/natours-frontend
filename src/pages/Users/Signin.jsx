import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { signinUser } from "../../utils/apiTours";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../components/Spinner";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: signinUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries(["user"]);
        toast.success("Logged in successfully");
        setIsLoading(false);
        setIsAuth(true);
        navigate("/dashboard");
      }
      reset();
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    setIsLoading(true);
    queryClient.removeQueries(["user"]);
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8F3DC]">
      <form
        className="h-auto w-[90%] max-w-[400px] rounded-2xl bg-white px-8 py-4 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-2xl font-semibold">Signin</h3>
        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your Email"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("email", {
              required: "Email must be filled!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email!",
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
            placeholder="Enter your password"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("password", { required: "Password must be filled" })}
          />
          {errors.password && (
            <p className="px-2 text-lg text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <button
            className={`w-full cursor-pointer rounded-full bg-[#FFD166] py-2 text-xl transition hover:bg-yellow-500 ${isLoading ? "disabled:cursor-not-allowed disabled:opacity-50" : ""}`}
          >
            {isLoading ? <Spinner size="w-8 h-8" /> : "Signin"}
          </button>
        </div>
        <div className="mt-5">
          <p className="px-2 text-lg">
            Forgot Password?{" "}
            <NavLink to="/reset" className="text-[#2D6A4F]">
              Reset here
            </NavLink>
          </p>
          <p className="px-2 py-2 text-lg">
            Don&apos;t have an account?{" "}
            <NavLink to="/signup" className="text-[#2D6A4F]">
              Signup
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
