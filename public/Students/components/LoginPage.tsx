import React, { useState, useRef, useEffect, useMemo } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface LoginPageProps {
  onLoginSuccess: () => void;
  setStudentData: (data: any) => void;
  openStudentProfileModal: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  setStudentData,
  openStudentProfileModal,
}) => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setrollNumber] = useState("");
  const [securityQuestion, setsecurityQuestion] = useState("");

  // State for Roll Number Autocomplete
  const [isRollDropdownOpen, setIsRollDropdownOpen] = useState(false);
  const rollDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rollDropdownRef.current &&
        !rollDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRollDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const rollNumberOptions = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        value: String(i + 1),
        label: `Roll ${i + 1}`,
      })),
    []
  );

  const filteredRollOptions = rollNumberOptions.filter((opt) =>
    opt.value.includes(rollNumber)
  );

  const handleRollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only integers
    if (val === "" || /^\d+$/.test(val)) {
      setrollNumber(val);
      setIsRollDropdownOpen(true);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/student/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save auth token
      localStorage.setItem("token", data.token);

      let student = data.student;

      if (!student) {
        alert("Invalid server response");
        return;
      }

      localStorage.setItem("studentId", student._id);


      // Clean data
      student = {
        ...student,
        name: student.name?.trim() !== "" ? student.name : student.username,
        phone: student.phone?.trim() !== "" ? student.phone : "no number",
        college: student.college || "",
      };

      // Set student globally
      setStudentData(student);
      localStorage.setItem("studentId", student._id);


      // first login checks
      if (student.firstLogin === true) {
        openStudentProfileModal();
      }

      // allow navigation
      onLoginSuccess();
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/student/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          rollNumber,
          securityQuestion,
          uniqueCode: code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! Please login now.");

      // Reset fields & go to login view
      setMode("login");
      setUsername("");
      setPassword("");
      setEmail("");
      setrollNumber("");
      setsecurityQuestion("");
      setCode("");
    } catch (err) {
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
                Student Login
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
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="your.username"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
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
              <p className="text-gray-500 mt-2">Join the Student Dashboard.</p>

              <form
                onSubmit={handleSignupSubmit}
                className="mt-8 space-y-4 text-left"
              >
                <div>
                  <label
                    htmlFor="signup-username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="signup-username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Choose a username"
                  />
                </div>
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Roll Number
                  </label>
                  <div className="mt-1 relative" ref={rollDropdownRef}>
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => {
                        const val = e.target.value;

                        // integer only, max 100
                        if (val === "" || /^\d+$/.test(val)) {
                          if (val === "" || Number(val) <= 100) {
                            setrollNumber(val);
                          }
                        }

                        setIsRollDropdownOpen(true); // always open on typing
                      }}
                      onClick={() => {
                        // open dropdown on click
                        setIsRollDropdownOpen(true);
                      }}
                      placeholder="Enter roll number"
                      className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />

                    {isRollDropdownOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                        {(rollNumber === ""
                          ? rollNumberOptions
                          : filteredRollOptions
                        ).map((opt) => (
                          <div
                            key={opt.value}
                            onClick={() => {
                              setrollNumber(opt.value);
                              setIsRollDropdownOpen(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                          >
                            {opt.value}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-security"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Security Question
                  </label>
                  <input
                    type="text"
                    id="signup-security"
                    name="SecurityQuestion"
                    value={securityQuestion}
                    onChange={(e) => setsecurityQuestion(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Who is your favourite animal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    id="signup-code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter invitation code"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
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
        &copy; {new Date().getFullYear()} Chitragupt. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
