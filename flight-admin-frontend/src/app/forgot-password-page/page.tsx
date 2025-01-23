/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter(); // Initialize useRouter

  return (
    <div className="flex h-screen">
      {/* Left side: Plane Image */}
      <div className="w-1/2 h-full">
        <img
          src="/images/plane_image_login_page.jpg"
          alt="Plane"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side: Forgot Password Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white opacity-95">
      <div className="text-5xl absolute top-4 right-8 flex gap-4 p-4">
          <img
            src="/images/flying-airplane.png"
            alt="Building"
            className="h-20"
          />
        </div>

        <div className="w-3/4 max-w-md bg-blue-50 p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate__animated animate__fadeInUp">
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-2">
            Forgot Password?
          </h1>
          <p className="text-center text-gray-600 mb-6">Give actual Email</p>

          <form className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full">SUBMIT</button>
          </form>

          {/* Back Button */}
          <div className="mt-4 flex justify-center">
            <button
              className="btn border-0 text-gray-600 bg-red-500 hover:bg-red-700"
              onClick={() => router.push("/login-landing-page")} // Redirect to Login Page
            >
              Back
            </button>
          </div>
        </div>

        <div className="text-5xl absolute bottom-4 right-8 flex gap-4 p-4">
          <img src="/images/paper-plane.png" alt="Building" className="h-20" />
        </div>
      </div>
    </div>
  );
}
