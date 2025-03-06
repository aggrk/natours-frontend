import Spinner from "./Spinner";

export default function CustomButton({ submitButtonText, isLoading }) {
  return (
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
  );
}
