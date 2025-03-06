export default function Spinner({ size = "w-8 h-8", screen }) {
  return (
    <div className={`${screen} flex items-center justify-center`}>
      <div
        className={`${size} animate-spin rounded-full border-4 border-[#2D6A4F] border-t-transparent`}
      ></div>
    </div>
  );
}
