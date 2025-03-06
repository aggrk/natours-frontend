import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { changePassword } from "../utils/apiTours";
import { useState } from "react";
import toast from "react-hot-toast";
import useLogout from "../utils/useLogout";
import CustomButton from "../components/CustomButton";

export default function ChangePassword() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const handleLogout = useLogout();

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password Updated successfully");
      setIsSubmiting(false);
      handleLogout();
    },
    onError: (err) => toast.error(err.message || "Unable to update password"),
  });

  function onsubmit(data) {
    setIsSubmiting(true);
    mutation.mutate({
      passwordCurrent: data.passwordCurrent,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-[#2D6A4F]">
        Change Password
      </h2>
      <div className="space-y-6">
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          {[
            {
              label: "Current Password",
              name: "passwordCurrent",
              validation: {
                required: "Your current password is required",
              },
            },
            {
              label: "New Password",
              name: "password",
              validation: {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number, and special character",
                },
              },
            },
            {
              label: "Confirm New Password",
              name: "passwordConfirm",
              validation: {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              },
            },
          ].map(({ label, name, validation }) => (
            <div key={label} className="space-y-2">
              <label className="block text-sm font-medium text-[#1B4332] sm:text-base">
                {label}
              </label>
              <input
                type="password"
                name={name}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-[#1B4332] outline-none transition-all focus:border-[#40916C] focus:bg-white focus:ring-2 focus:ring-[#40916C]"
                {...register(name, validation)}
              />
              {errors[name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[name].message}
                </p>
              )}
            </div>
          ))}
          <CustomButton
            submitButtonText="Change Password"
            isLoading={isSubmiting}
            className="w-full rounded-lg bg-gradient-to-r from-[#2D6A4F] to-[#1B4442] px-6 py-3 text-lg font-semibold text-white transition-all hover:from-[#1B4442] hover:to-[#2D6A4F] hover:shadow-lg disabled:opacity-70"
          />
        </form>
      </div>
    </section>
  );
}
