import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../utils/apiTours";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomForm from "../../components/CustomForm";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Signed up successfully!");
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
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  };

  const fields = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Aggr Kennedy",
      icon: FaUser,
      validation: {
        required: "Name is required",
        pattern: {
          value: /^[A-Za-z]+(?: [A-Za-z]+)*$/i,
          message: "Only letters are allowed",
        },
      },
    },
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
      label: "Confirm Password",
      placeholder: "••••••••",
      icon: FaLock,
      validation: {
        required: "Confirm your password",
        validate: (value) =>
          value === watch("password") || "Passwords do not match",
      },
    },
  ];

  const bottomLinks = [
    {
      text: "Already have an account?",
      to: "/signin",
      label: "Sign In",
    },
  ];

  return (
    <CustomForm
      title="Create Account"
      subtitle="Start your adventure with us"
      fields={fields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitButtonText="Sign Up"
      bottomLinks={bottomLinks}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
      register={register}
    />
  );
}
