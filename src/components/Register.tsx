import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegistrationForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);

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

            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <Input type="email" required />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Password</label>
                <Input type="password" required />
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Create Account
              </Button>
            </form>
          </>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-orange-600 hover:underline">Terms</a> and{" "}
          <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>.
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
