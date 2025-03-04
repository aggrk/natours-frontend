import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../../utils/apiTours";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomForm from "../../components/CustomForm";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: signinUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries(["user"]);
        toast.success("Logged in successfully");
        setIsLoading(false);
        setIsAuth(true);
        navigate("/dashboard/profile");
      }
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    queryClient.removeQueries(["user"]);
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

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
      },
    },
  ];

  const bottomLinks = [
    {
      text: "Forgot Password?",
      to: "/reset",
      label: "Reset here",
    },
    {
      text: "Don't have an account?",
      to: "/signup",
      label: "Signup",
    },
  ];

  return (
    <CustomForm
      title="Welcome Back"
      subtitle="Sign in to your account"
      fields={fields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitButtonText="Sign In"
      bottomLinks={bottomLinks}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
    />
  );
}
