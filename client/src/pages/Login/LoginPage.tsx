import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, UserPlus } from "lucide-react";

const LoginPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Unsplash profile images
  const profileImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces"
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(parsedUser.name);
      setProfilePic(parsedUser.picture || "");
      // Navigate to home page ("/") after login
      navigate("/");
    }
  }, [navigate]);

  const handleEmailPasswordLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        containerName: "Users",
        email,
        password,
      });
      const { data } = response;

      if (data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUserName(data.user.name);
        // Navigate to home page ("/")
        navigate("/");
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError("Failed to login. Please try again later.");
      console.error("Email-password login error:", err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      try {
        const googleResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const userData = googleResponse.data;

        const backendResponse = await axios.post("user/google-login", {
          containerName: "Users",
          user: {
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
          },
        });

        const { user } = backendResponse.data;

        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        setUserName(user.name);
        setProfilePic(user.picture || "");
        // Navigate to home page ("/") after Google login
        navigate("/");
      } catch (error) {
        console.error("Google login failed:", error);
        setError("Failed to log in with Google. Please try again.");
      }
    },
    onError: () => {
      setError("Google login failed. Please try again.");
    },
  });

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Decorative lines */}
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80')", backgroundSize: 'cover', opacity: '0.1' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent backdrop-blur-[1px]" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="w-full max-w-6xl flex items-center justify-between px-8 py-12 relative z-10">
        {/* Left Content */}
        <div className="w-1/2 pr-12">
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-2">
              #1 Bachelor's Community in India
            </div>
            <h1 className="text-6xl font-bold leading-tight">
              Connect. Share.
              <br />
              <span className="text-teal-100">Thrive Together.</span>
            </h1>
            <p className="text-xl text-teal-50 leading-relaxed max-w-xl">
              Join thousands of bachelors across India in creating meaningful connections
              and sharing life's journey together.
            </p>
            <div className="flex items-center space-x-8 mt-8">
              <div className="flex -space-x-4">
                {profileImages.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt={`Community Member ${i + 1}`}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg transform hover:scale-110 transition-transform duration-200"
                  />
                ))}
              </div>
              <p className="text-teal-50">
                Join <span className="font-bold">10,000+</span> active members
              </p>
            </div>
          </div>
        </div>

        {/* Login Container */}
        <div className="w-[450px] bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
          {isLoggedIn ? (
            <div className="text-center space-y-4">
              <img
                src={profilePic}
                alt="User Profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-teal-500 shadow-xl"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome back, {userName}!
              </h2>
              <div className="animate-pulse">
                <p className="text-teal-600">Redirecting to your dashboard...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-gray-500">Sign in to continue your journey</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleEmailPasswordLogin();
              }} className="space-y-5">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="py-2 px-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium text-lg flex items-center justify-center group"
                >
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              <button
                onClick={() => login()}
                className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">Google</span>
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  New to our platform?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center group"
                  >
                    Create an account
                    <UserPlus className="ml-1 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
