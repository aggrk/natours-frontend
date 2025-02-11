import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../utils/apiTours";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../components/Spinner";

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => updatePassword({ ...data }, token),
    onSuccess: () => {
      toast.success("Password reseted successfully");
      setIsLoading(false);
      reset();
      navigate("/signin");
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    setIsLoading(true);
    mutation.mutate({
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  }

  const password = watch("password");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8F3DC]">
      <form
        className="h-auto w-[90%] max-w-[400px] rounded-2xl bg-white px-8 py-4 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-2xl font-semibold">Update Password</h3>

        <div className="mt-5 flex flex-col gap-4">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
            {...register("password", {
              required: "Password must be filled",
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
        <div className="mb-8 mt-8">
          <button
            className={`w-full cursor-pointer rounded-full bg-[#FFD166] py-2 text-xl transition hover:bg-yellow-500 ${isLoading ? "disabled:cursor-not-allowed disabled:opacity-50" : ""}`}
          >
            {isLoading ? <Spinner size="w-8 h-8" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
