import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../utils/apiTours";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import CustomForm from "../../components/CustomForm";
import { FaLock } from "react-icons/fa";

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

  const fields = [
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
      icon: FaLock,
      validation: {
        required: "Password is required",
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
      name: "passwordConfirm",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
      icon: FaLock,
      validation: {
        required: "Confirm Password is required",
        validate: (value) =>
          value === watch("password") || "Passwords do not match",
      },
    },
  ];

  return (
    <CustomForm
      title="Update Password"
      subtitle="Update password here"
      fields={fields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitButtonText="Update Password"
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
}
