import React, { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface LoginPageProps {
  onLoginSuccess: (teacherData: any) => void; // MUST MATCH App.tsx
}



const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/teacher/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("🔥 TEACHER LOGIN RESPONSE:", data.teacher);


      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // MUST exist now
      if (!data.teacher) {
        alert("Server error: no teacher data returned");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // 👉 SEND teacher data to App.tsx
      onLoginSuccess(data.teacher);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/teacher/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          subjectCode: code,
          email,
          securityQuestion,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! Please login.");

      setMode("login");
      setUsername("");
      setPassword("");
      setCode("");
      setEmail("");
      setSecurityQuestion("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      <main className="flex-grow flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in-down">
          <div className="mx-auto bg-blue-600 text-white rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
              />
            </svg>
          </div>

          {mode === "login" && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">
                Teacher Portal
              </h1>
              <p className="text-gray-500 mt-2">
                Sign in to access your dashboard.
              </p>

              <form
                onSubmit={handleLoginSubmit}
                className="mt-8 space-y-4 text-left"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-blue-600 text-sm"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                >
                  Sign In
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-blue-600 font-medium"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}

          {mode === "signup" && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">
                Create Account
              </h1>
              <p className="text-gray-500 mt-2">Join the Teacher Portal.</p>

              <form
                onSubmit={handleSignupSubmit}
                className="mt-8 space-y-4 text-left"
              >
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                {/* Security Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Security Answer
                  </label>
                  <input
                    type="text"
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                {/* Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                >
                  Sign Up
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 font-medium"
                >
                  Sign In
                </button>
              </p>
            </>
          )}

          {mode === "forgot" && (
            <ForgotPasswordForm onBackToLogin={() => setMode("login")} />
          )}
        </div>
      </main>

      <footer className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Chitragupt. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
