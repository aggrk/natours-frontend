import { useForm } from "react-hook-form";
import { forgotPassword } from "../../utils/apiTours";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../components/Spinner";

export default function ResetLink() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Reset link sent, check your email");
      setIsLoading(false);
      reset();
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    setIsLoading(true);
    mutation.mutate({
      email: data.email,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8F3DC]">
      <form
        className="h-auto w-[90%] max-w-[400px] rounded-2xl bg-white px-8 py-4 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-2xl font-semibold">
          Request reset link
        </h3>
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
        <div className="mb-8 mt-8">
          <button
            disabled={isLoading}
            className={`w-full cursor-pointer rounded-full bg-[#FFD166] py-2 text-xl transition hover:bg-yellow-500 ${isLoading ? "disabled:cursor-not-allowed disabled:opacity-50" : ""}`}
          >
            {isLoading ? <Spinner size="w-8 h-8" /> : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
