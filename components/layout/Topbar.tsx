import { useDispatch } from "react-redux";
import { ThemeToggle } from "../feed/ThemeToggle";

export const Topbar = () => {
  return (
    <div className="h-5 bg-gray-700 flex items-center justify-between px-6 shadow-sm">
      <div className="w-1/3"></div>

      <div className="flex items-center gap-4">
        <span className="text-gray-300">Welcome, Rajdip</span>
        <img
          src="/user-avatar.png"
          alt="User"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </div>
  );
};
