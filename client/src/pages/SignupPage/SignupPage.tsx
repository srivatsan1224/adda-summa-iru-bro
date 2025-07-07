import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import glogo from "../../assets/LoginPage/googlelogo.png";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !mobileNumber || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        containerName: "Users",
        users: [
          {
            name,
            email,
            mobileNumber,
            password,
          },
        ],
      });

      const { data } = response;

      if (data && data.results) {
        const result = data.results[0]; // Handle first user in results array
        if (result.status === "success") {
          const user = {
            id: result.userId,
            name,
            email,
            mobileNumber,
          };
          localStorage.setItem("user", JSON.stringify(user)); // Save user data in localStorag
          navigate("/"); 
        } else {
          setError(result.message || "Signup failed. Please try again.");
        }
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      setError("Failed to signup. Please try again later.");
      console.error("Signup error:", err);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      try {
        // Fetch Google user info
        const googleResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const googleUser = googleResponse.data;

        // Send user data to backend
        const backendResponse = await axios.post("http://localhost:3000/google-login", {
          containerName: "Users",
          user: {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
          },
        });

        const { user } = backendResponse.data;

        // Save user details locally
        localStorage.setItem("user", JSON.stringify(user));
        alert("Google signup successful! Redirecting to home...");
        setTimeout(() => {
          navigate("/home"); // Redirect to home page
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch or save Google user info:", error);
        setError("Google signup failed. Please try again.");
      }
    },
    onError: () => {
      setError("Google signup was unsuccessful. Please try again.");
      console.error("Google signup failed");
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="min-h-screen flex w-4/5 items-center justify-between px-8">
        {/* Left Content */}
        <div className="w-1/2 flex items-start">
          <div className="text-left space-y-4">
            <h1 className="text-5xl font-extrabold text-black leading-tight">
              India’s #1<br />Bachelors App
            </h1>
            <p className="text-gray-700 text-lg">
              Join Us Today! Become a part of our <br />
              growing community. Register today to start your journey with us.
            </p>
          </div>
        </div>

        {/* Sign-up Form */}
        <div className="w-1/3 bg-white p-8 shadow-xl rounded-xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:font-semibold hover:border-gray-300 transition-all text-lg shadow-md"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-500 my-4">
            <span>or</span>
          </div>
          <button
            onClick={() => loginWithGoogle()}
            className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all text-lg font-medium"
          >
            <img src={glogo} alt="Google Logo" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
