import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { decryptObject, encryptObject } from "@/GlobalFunctions";
const LoginAuth = ({ postUrl, typeName }) => {
  const { setUserAuthData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${postUrl}`, {
        userRole: "user",
        userName: email,
        password: password,
      });
      if (response === 401) {
        setMessage("Username already exists");
      } else {
        router("/auth");
      }
    } catch (error) {
      console.log(error);
      setMessage("");
    }
  };
  return (
    <div
      className="hero-content flex-col lg:flex-row-reverse"
      style={{ padding: "0px", width: "" }}
    >
      <div className="card login-card shrink-0 w-full bg-base-100">
        <form className="card-body" onSubmit={handleSignup}>
          <h1 className="p-0 text-xl">{typeName}'s Signup</h1>
          <div className="form-control ">
            <label>Email/Username</label>
            <div className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow w-full sm:w-auto"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email or Username"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label>Password</label>
            <div className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow w-full sm:w-auto"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
          <p className="text-error">{message}</p>
          <div className="form-control">
            <button
              className="btn w-full sm:w-auto"
              type="submit"
              style={{ backgroundColor: "var(--purple)", color: "white" }}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                "Signup"
              )}
            </button>
          </div>
          <label className="label mt-1">
            <Link href="/auth" className="label-text-alt link link-hover">
              Already have an account? Login here!
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default LoginAuth;
