// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { FcGoogle } from "react-icons/fc";

// export default function LoginForm() {
//   const [showEmailForm, setShowEmailForm] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50">
//       <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white">
//         <CardContent>
//           <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">
//             Sign In to Your Account
//           </h2>

//           {/* Google Login */}
//           <Button
//             variant="outline"
//             className="w-full mb-4 flex items-center justify-center gap-2 border-orange-500 text-orange-600 hover:bg-orange-100"
//             // onClick={signInWithGoogle}
//           >
//             <FcGoogle size={20} /> Continue with Google
//           </Button>

//           {/* Continue with Email */}
//           {!showEmailForm && (
//             <Button
//               variant="outline"
//               className="w-full mb-4 border-gray-300 text-gray-700 hover:bg-orange-100"
//               onClick={() => setShowEmailForm(true)}
//             >
//               Continue with Email
//             </Button>
//           )}

//           {/* Email Form */}
//           {showEmailForm && (
//             <>
//               <div className="flex items-center my-4">
//                 <div className="flex-grow border-t border-gray-300" />
//                 <span className="mx-4 text-gray-400 text-sm">or</span>
//                 <div className="flex-grow border-t border-gray-300" />
//               </div>

//               <form className="space-y-4">
//                 <div>
//                   <label className="text-sm text-gray-600 block mb-1">Email</label>
//                   <Input type="email" placeholder="you@example.com" required />
//                 </div>

//                 <div>
//                   <label className="text-sm text-gray-600 block mb-1">Password</label>
//                   <Input type="password" placeholder="••••••••" required />
//                 </div>

//                 <Button className="w-full bg-orange-600 hover:bg-orange-700">
//                   Sign In
//                 </Button>
//               </form>
//             </>
//           )}

//           {/* Footer */}
//           <p className="mt-6 text-sm text-center text-gray-600">
//             Don’t have an account?{" "}
//             <a href="/register" className="text-orange-600 font-medium hover:underline">
//               Register here
//             </a>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("business")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulated login delay
    setTimeout(() => {
      setIsLoading(false)
      if (userType === "admin") {
        navigate("/components/admin/dashboard")
      } else {
        navigate("/components/business/dashboard")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to ReviewHUT</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="business" className="w-full mb-6" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="business">Business User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
