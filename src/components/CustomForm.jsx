import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "./Spinner";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function CustomForm({
  title,
  subtitle,
  fields,
  onSubmit,
  isLoading,
  submitButtonText = "Submit",
  bottomLinks,
  watch,
  register,
  errors,
  handleSubmit,
}) {
  const [showPassword, setShowPassword] = useState({}); // State for toggling password visibility

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D8F3DC] to-[#B7E4C7]">
      <form
        className="w-[90%] max-w-[450px] rounded-3xl bg-white p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title and Subtitle */}
        {title && (
          <div className="mb-8 text-center">
            <h3 className="font-heading text-3xl font-bold text-[#2D6A4F]">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-2 text-lg text-[#2D6A4F]/90">{subtitle}</p>
            )}
          </div>
        )}

        {/* Dynamic Fields */}
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              {/* Field Label */}
              {field.label && (
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
              )}

              {/* Input Container */}
              <div className="relative">
                {/* Icon (if provided) */}
                {field.icon && (
                  <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D6A4F]/80" />
                )}

                {/* Input Field */}
                <input
                  type={
                    field.type === "password"
                      ? showPassword[field.name]
                        ? "text"
                        : "password"
                      : field.type || "text"
                  }
                  placeholder={field.placeholder}
                  className={`w-full rounded-xl border border-gray-300 bg-gray-50 ${
                    field.icon ? "pl-12" : "pl-4"
                  } py-3 pr-12 text-gray-900 transition-all focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/50`}
                  {...register(field.name, {
                    ...field.validation,
                    validate: field.validation.validate
                      ? (value) => field.validation.validate(value, watch)
                      : undefined,
                  })}
                />

                {/* Eye Icon for Password Fields */}
                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        [field.name]: !prev[field.name],
                      }))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#2D6A4F]/80 hover:text-[#2D6A4F]"
                  >
                    {showPassword[field.name] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>

              {/* Error Message */}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#1B4442] px-6 py-3.5 text-lg font-semibold text-white transition-all hover:from-[#1B4442] hover:to-[#2D6A4F] hover:shadow-md disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Spinner size="w-5 h-5" />
                <span>Loading...</span>
              </>
            ) : (
              submitButtonText
            )}
          </button>

          {/* Bottom Links (if provided) */}
          {bottomLinks && (
            <div className="mt-6 text-center">
              {bottomLinks.map((link, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {link.text}{" "}
                  <NavLink
                    to={link.to}
                    className="font-semibold text-[#2D6A4F] underline-offset-4 transition-all hover:underline"
                  >
                    {link.label}
                  </NavLink>
                </p>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
