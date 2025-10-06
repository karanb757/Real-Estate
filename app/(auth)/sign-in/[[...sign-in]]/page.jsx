"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Left Image */}
        <div
          className="hidden lg:block w-1/2 bg-cover"
          style={{ backgroundImage: "url('/login.png')" }}
        ></div>

        {/* Sign In Form */}
        <div className="w-full lg:w-1/2 bg-black flex flex-col justify-center items-center p-10 pt-24">
          <div className="w-full max-w-sm">
            <div className="mb-8 text-center">
              <h1 className="text-white text-3xl font-bold">Welcome back</h1>
              <p className="text-gray-400 text-sm mt-2">Log in to your account</p>
            </div>

            <SignIn
              appearance={{
                elements: {
                  // Card container
                  card: "bg-black border border-gray-800 text-white",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",

                  // Input fields (email & password)
                  formFieldInput:
                    "bg-black text-white border border-white rounded-md px-3 py-2 placeholder-gray-400 focus:ring-2 focus:ring-[#7f57f1] focus:outline-none",

                  // Labels for input fields
                  formFieldLabel: "text-white",

                  // Primary button
                  formButtonPrimary:
                    "bg-[#7f57f1] hover:bg-[#6a45d8] text-white font-medium transition rounded-md py-2",
                },
                variables: {
                  colorPrimary: "#7f57f1",
                  colorText: "#fff",
                  colorBackground: "#000",
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

