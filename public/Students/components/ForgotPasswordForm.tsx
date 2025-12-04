import React, { useState, useEffect } from "react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [securityQuestion, setsecurityQuestion] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(0);
  const [hasSentOtp, setHasSentOtp] = useState(false);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ FIXED — RESTORED handleSendOtp
  const handleSendOtp = async () => {
    if (!username) return;

    // 🔥 INSTANTLY lock the button
    setHasSentOtp(true);
    setTimer(30);

    try {
      const res = await fetch("/api/student/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);

        // 🔥 re-enable button if server fails
        setTimer(0);
        setHasSentOtp(false);
        return;
      }

      alert("OTP sent!");
    } catch (err) {
      alert("Server error");

      // 🔥 re-enable button if network fails
      setTimer(0);
      setHasSentOtp(false);
    }
  };


  // ✅ FIXED — ONLY ONE handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/student/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          otp,
          securityQuestion,
          newUsername,
          newPassword,
        }),
      });
      console.log("DEBUG FRONTEND PAYLOAD", {
        username,
        otp,
        securityQuestion,
        newUsername,
        newPassword,
      });


      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Password reset successful!");
      onBackToLogin();
    } catch {
      alert("Server error");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mt-4">Reset Password</h1>
      <p className="text-gray-500 mt-2">
        Enter your details to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
      
        <div>
          <label
            htmlFor="reset-username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="reset-username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="your.username"
          />
        </div>

        <div>
          <label
            htmlFor="reset-otp"
            className="block text-sm font-medium text-gray-700"
          >
            Email OTP
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="reset-otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 block w-full px-3 py-2 rounded-l-md border border-blue-300"
              placeholder="Write the OTP sent to your mail"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              disabled={timer > 0}
              className={`inline-flex items-center px-4 py-2 border border-l-0 rounded-r-md text-sm font-medium ${
                timer > 0
                  ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {timer > 0
                ? `Resend (${timer}s)`
                : hasSentOtp
                ? "Resend"
                : "Send"}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Security Question
          </label>
          <input
            type="text"
            value={securityQuestion}
            onChange={(e) => setsecurityQuestion(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
            placeholder="Who is your favorite animal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
            placeholder="Choose a new username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
            placeholder="Create a new password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6">
        Remember your password?{" "}
        <button
          onClick={onBackToLogin}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign In
        </button>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
