import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#009398] rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#009398] rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009398] rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      <div
        className={`text-center relative z-10 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        <div className="relative">
          <h1
            className={`text-8xl md:text-9xl font-bold text-[#009398] transform transition-all duration-1500 delay-300 ${isVisible ? "scale-100 rotate-0" : "scale-75 rotate-12"
              }`}
          >
            4<span className="inline-block animate-pulse delay-200">0</span>
            <span className="inline-block animate-pulse delay-400">4</span>
          </h1>

          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-[#009398] opacity-20 blur-sm animate-pulse">
            404
          </div>
        </div>

        <h2
          className={`mt-6 text-2xl md:text-3xl font-semibold text-gray-800 transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
        >
          Oops! Page Not Found
        </h2>

        <p
          className={`mt-4 text-gray-600 max-w-md mx-auto leading-relaxed transform transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex justify-center space-x-4 mt-8 mb-8">
          <div className="w-3 h-3 bg-[#009398] rounded-full animate-bounce opacity-60"></div>
          <div className="w-3 h-3 bg-[#009398] rounded-full animate-bounce delay-100 opacity-70"></div>
          <div className="w-3 h-3 bg-[#009398] rounded-full animate-bounce delay-200 opacity-80"></div>
        </div>

        <div
          className={`transform transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
        >
          <button
            onClick={() => navigate("/order")}
            className="group relative px-8 py-3 bg-[#009398] hover:bg-[#007a7f] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#009398] to-[#007a7f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <span className="relative z-10 flex items-center space-x-2">
              <span>Go Home</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        <div
          className={`mt-8 space-y-2 transform transition-all duration-1000 delay-1200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
        >
          <p className="text-sm text-gray-500">Or try these options:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="text-[#009398] hover:text-[#007a7f] font-medium text-sm transition-all duration-300 hover:opacity-80 transform hover:scale-105"
            >
              ← Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-[#009398] hover:text-[#007a7f] font-medium text-sm transition-all duration-300 hover:opacity-80 transform hover:scale-105"
            >
              Home Page
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-[#009398] hover:text-[#007a7f] font-medium text-sm transition-all duration-300 hover:opacity-80 transform hover:scale-105"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
