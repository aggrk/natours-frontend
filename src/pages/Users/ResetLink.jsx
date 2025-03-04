import { useForm } from "react-hook-form";
import { forgotPassword } from "../../utils/apiTours";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import CustomForm from "../../components/CustomForm";
import { FaEnvelope } from "react-icons/fa";

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

  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "aggr@example.com",
      icon: FaEnvelope,
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Invalid email address",
        },
      },
    },
  ];

  return (
    <CustomForm
      title="Reset Password"
      subtitle="Send Reset Link"
      fields={fields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitButtonText="Send Link"
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
    />
  );
}
