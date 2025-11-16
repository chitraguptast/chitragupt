import React, { useState } from "react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [username, setUsername] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/student/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          uniqueCode,
          newUsername,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to reset password");
        return;
      }

      alert("Password reset successful!");
      onBackToLogin();
    } catch (err) {
      console.error(err);
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
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="your.username"
          />
        </div>
        <div>
          <label
            htmlFor="reset-code"
            className="block text-sm font-medium text-gray-700"
          >
            Unique Code
          </label>
          <input
            type="text"
            id="reset-code"
            name="code"
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="Enter recovery code"
          />
        </div>
        <div>
          <label
            htmlFor="reset-new-username"
            className="block text-sm font-medium text-gray-700"
          >
            New Username
          </label>
          <input
            type="text"
            id="reset-new-username"
            name="new-username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="Choose a new username"
          />
        </div>
        <div>
          <label
            htmlFor="reset-new-password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="reset-new-password"
            name="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="Create a new password"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset Password
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-6">
        Remember your password?{" "}
        <button
          onClick={onBackToLogin}
          className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
