export default function Footer() {
  return (
    <footer className="h-46 mt-auto flex w-full items-center border-t border-gray-300 bg-gray-100 px-6 sm:h-24">
      <div className="container mx-auto mb-5 flex w-full flex-col items-center justify-center sm:mb-0 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo */}
        <img
          src="/img/logo-green.png"
          alt="Natours Logo"
          className="hidden h-10 w-32 sm:block"
        />

        {/* Links & Copyright */}
        <div className="flex flex-col items-center justify-center text-gray-700 sm:items-end">
          <ul className="mb-1 mt-8 flex flex-col items-center space-x-1 text-center text-lg sm:mt-0 sm:flex-row sm:space-x-6 sm:text-base">
            <li className="cursor-pointer hover:text-green-600">About us</li>
            <li className="cursor-pointer hover:text-green-600">
              Become a guide
            </li>
            <li className="cursor-pointer hover:text-green-600">Careers</li>
            <li className="cursor-pointer hover:text-green-600">Contact</li>
          </ul>
          <p className="mt-5 text-sm text-gray-400 sm:mt-0">
            &copy; 2025 Kennedy Phinias
          </p>
        </div>
      </div>
    </footer>
  );
}
