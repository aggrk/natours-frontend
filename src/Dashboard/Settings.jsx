import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateUser } from "../utils/apiTours";
import toast from "react-hot-toast";

export default function Settings() {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Photo uploaded successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const formData = new FormData();
    if (data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    mutation.mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        id="upload"
        {...register("photo")}
        accept="image/*"
        className="cursor-pointer border-2 border-gray-950 px-8 py-4"
      />
      <button className="ml-4 cursor-pointer bg-gray-950 px-5 py-4 text-white">
        Upload
      </button>
    </form>
  );
}
