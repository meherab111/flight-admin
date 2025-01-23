/* eslint-disable @next/next/no-img-element */
"use client";

export default function ChangePasswordPage() {
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

      {/* Right side: Change Password Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white opacity-95">
      <div className="text-5xl absolute top-4 right-8 flex gap-4 p-4">
          <img
            src="/images/flying-airplane.png"
            alt="Building"
            className="h-20"
          />
        </div>

        {/* Change Password Form */}
        <div className="w-3/4 max-w-md bg-blue-50 p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate__animated animate__fadeInUp">
          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-2">
            Change Password
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Give a strong password
          </p>

          {/* Password Input Form */}
          <form className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="flex justify-center">
              <button className="btn btn-primary w-full transition-all duration-300 ease-in-out hover:bg-blue-700 animate__animated animate__zoomIn">
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        <div className="text-5xl absolute bottom-4 right-8 flex gap-4 p-4">
          <img src="/images/paper-plane.png" alt="Building" className="h-20" />
        </div>
      </div>
    </div>
  );
}
