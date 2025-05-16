import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">
            Sign In to Your Account
          </h2>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full mb-4 flex items-center justify-center gap-2 border-orange-500 text-orange-600 hover:bg-orange-100"
            // onClick={signInWithGoogle}
          >
            <FcGoogle size={20} /> Continue with Google
          </Button>

          {/* Continue with Email */}
          {!showEmailForm && (
            <Button
              variant="outline"
              className="w-full mb-4 border-gray-300 text-gray-700 hover:bg-orange-100"
              onClick={() => setShowEmailForm(true)}
            >
              Continue with Email
            </Button>
          )}

          {/* Email Form */}
          {showEmailForm && (
            <>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>

              <form className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Email</label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Password</label>
                  <Input type="password" placeholder="••••••••" required />
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Sign In
                </Button>
              </form>
            </>
          )}

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-orange-600 font-medium hover:underline">
              Register here
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
