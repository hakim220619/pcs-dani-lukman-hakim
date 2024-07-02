// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setemail] = useState("danilukman2206@gmail.com");
  const [password, setPassword] = useState("12345678");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
console.log(setIsLoggedIn);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const fData = new FormData();
      fData.append("email", email);
      fData.append("password", password);
      // Ganti dengan endpoint login dari backend Anda
      console.log(fData);
      const response = await axios.post(
        "https://apipcsexpress.sppapp.com/api/login",
        {email, password}
      );
      // Simpan token atau sesuatu yang menandakan login berhasil di state atau localStorage

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true); // Set isLoggedIn ke true
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">email</label>
              <input
            
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
