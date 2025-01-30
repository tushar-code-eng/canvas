"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link"

export default function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        if (result?.ok) {
            router.push("/")
        } else {
            // Handle error
            console.error("Sign in failed")
        }
    }

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/home" })
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4 rounded-md shadow-sm">
                    <div>
                        <Label htmlFor="email-address">Email address</Label>
                        <Input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6">
                    <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                        <GoogleIcon className="mr-2" />
                        Sign in with Google
                    </Button>
                </div>
            </div>
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signUp" className="font-medium text-primary hover:text-primary-dark">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

