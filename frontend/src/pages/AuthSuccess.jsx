import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      // Store token securely
      localStorage.setItem("token", token);

      // Small delay for smooth UX (optional)
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      // No token found → redirect to home
      navigate("/");
    }
  }, [params, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#1b1b33] to-[#2c2c54] text-gray-100">
      <Loader2 className="animate-spin text-blue-400 w-12 h-12 mb-4" />
      <p className="text-lg font-medium">Signing you in securely...</p>
    </div>
  );
};

export default AuthSuccess;
