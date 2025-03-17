
import { Camera } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Camera size={28} className="text-primary" />
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          SnapTracker
        </h1>
      </div>
      <p className="text-sm text-gray-500">Your Social Media Archive</p>
    </header>
  );
};

export default Header;
