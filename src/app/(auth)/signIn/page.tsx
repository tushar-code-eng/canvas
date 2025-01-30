import SignInForm from "@/components/auth/SignIn"

export default function SignIn() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-8">
        <SignInForm />
      </div>
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-8">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Shape Designer</h1>
          <p className="text-xl">Create beautiful designs with ease</p>
        </div>
      </div>
    </div>
  )
}

