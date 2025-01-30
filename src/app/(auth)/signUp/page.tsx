import SignUpForm from "@/components/auth/SignUp"

export default function SignUp() {
    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex items-center justify-center p-8">
                <SignUpForm />
            </div>
            <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-8">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Join Shape Designer</h1>
                    <p className="text-xl">Start creating beautiful designs today</p>
                </div>
            </div>
        </div>
    )
}

