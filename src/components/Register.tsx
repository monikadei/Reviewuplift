import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegistrationForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        alert("Registration successful! Please login.");
        // Optionally redirect to login page here
      } else {
        const error = await response.text();
        alert("Registration failed: " + error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
          Create your account
        </h2>

        {/* Google Signup */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition mb-4">
          <FcGoogle size={22} />
          <span className="text-sm text-gray-700">Continue with Google</span>
        </button>

        {/* Email Signup Trigger */}
        {!showEmailForm && (
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-orange-50"
            onClick={() => setShowEmailForm(true)}
          >
            Continue with Email
          </Button>
        )}

        {/* Email Signup Form */}
        {showEmailForm && (
          <>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Username</label>
                <Input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Create Account
              </Button>
            </form>
          </>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-orange-600 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-orange-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
