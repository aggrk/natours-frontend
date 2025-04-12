import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchUser, updateUser } from "../utils/apiTours";
import toast from "react-hot-toast";
import CustomButton from "../components/CustomButton";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Updated profile successfully");
      setIsSubmiting(false);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
    },
    onError: (err) => toast.error(err.message || "Unable to update profile"),
  });

  const handleEditProfile = () => setIsEditing(true);
  const onSubmit = (data) => {
    setIsSubmiting(true);
    mutation.mutate({
      name: data.name,
      email: data.email,
    });
  };

  const { name, email } = user?.data?.data || {};

  return (
    <section className="rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-[#2D6A4F] sm:mb-6 sm:text-2xl">
        Edit Profile
      </h2>
      {isEditing ? (
        <div className="space-y-4 sm:space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {["name", "email"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium capitalize text-[#1B4332] sm:text-base">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  defaultValue={user?.data?.data[field] || ""}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm text-[#1B4332] outline-none transition-all focus:border-[#40916C] focus:bg-white focus:ring-2 focus:ring-[#40916C] sm:p-3 sm:text-base"
                  {...register(field)}
                />
              </div>
            ))}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <CustomButton
                submitButtonText="Save Profile"
                isLoading={isSubmiting}
              />
              <button
                type="button" //this type prevents form submission
                onClick={() => setIsEditing(false)}
                className="w-full cursor-pointer rounded-lg border border-[#2D6A4F] bg-white px-4 py-2.5 text-base font-semibold text-[#2D6A4F] transition-all hover:bg-gray-50 hover:shadow-lg sm:px-6 sm:py-3 sm:text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm text-[#1B4332] sm:text-base">
            <strong className="font-semibold">Name:</strong> {name || "N/A"}
          </p>
          <p className="text-sm text-[#1B4332] sm:text-base">
            <strong className="font-semibold">Email:</strong> {email || "N/A"}
          </p>
          <button
            onClick={handleEditProfile}
            className="w-full cursor-pointer rounded-lg bg-[#FFD166] px-4 py-2.5 text-sm font-semibold text-[#1B4332] transition-all hover:bg-[#FFC107] hover:shadow-md sm:w-auto sm:px-6 sm:py-3 sm:text-base"
          >
            Edit Profile
          </button>
        </div>
      )}
    </section>
  );
}
