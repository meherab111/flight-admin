/* eslint-disable @next/next/no-img-element */
'use client'

export default function LoginPage() {
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
  
        {/* Right side: Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-white opacity-95">
          {/* Animated Login Form */}
          <div className="w-3/4 max-w-md bg-blue-50 p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate__animated animate__fadeInUp">
            {/* Airplane Icon */}
            <div className="text-5xl absolute top-0 right-4 flex gap-4 p-4 animate__animated animate__bounceIn">
              <img
                src="/images/flying-airplane.png"
                alt="Building"
                className="h-16"
              />
            </div>
  
            {/* Welcome Text */}
            <h2 className="text-5xl font-bold text-center text-blue-700 mb-2 animate__animated animate__fadeIn">
              Welcome
            </h2>
            <p className="text-center text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
              Login with Your Account
            </p>
  
            {/* Login Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
              />
              <div className="flex justify-center">
                <a className="text-sm text-blue-500 cursor-pointer hover:underline transition-all duration-300 ease-in-out hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <button className="btn btn-primary w-full transition-all duration-300 ease-in-out hover:bg-blue-700 animate__animated animate__zoomIn">LOGIN</button>
            </form>
          </div>
  
          {/* Footer Icons (Add social media or other icons here) */}
        </div>
      </div>
    );
}
