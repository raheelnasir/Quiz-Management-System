"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Page = () => {
  const [name, setName] = useState("");
  const { userAuth } = useContext(AuthContext);
  const handleNameChange = (e) => {
    setName(e.target.value); // Update name state as the user types
  };

  const handleStartQuiz = () => {
    const trimmedName = name.trim(); // Trim the name before encoding
    const encodedName = encodeSpaces(trimmedName); // Encode only spaces
    if (userAuth && userAuth.userName && userAuth.userName.length > 1) {
      window.location.href = `/quiz/${userAuth.userName}`; // Redirect to the quiz page with encoded name
    } else {
      window.location.href = `/quiz/${encodedName}`; // Redirect to the quiz page with encoded name
    }
  };

  const handleArtStartQuiz = () => {
    const trimmedName = name.trim(); // Trim the name before encoding
    const encodedName = encodeSpaces(trimmedName); // Encode only spaces
    if (userAuth.userName.length > 1) {
      window.location.href = `/artsquiz/${userAuth.userName}`; // Redirect to the quiz page with encoded name
    } else {
      window.location.href = `/artsquiz/${encodedName}`; // Redirect to the quiz page with encoded name
    }
  };
  const encodeSpaces = (str) => {
    return str.replace(/ /g, ""); // Replace spaces with "%20"
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Quiz Starter</h1>
        <div className="mb-4">
          {userAuth && userAuth.userName && userAuth.userName.length > 1 ? (
            ""
          ) : (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter Your Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your Name"
                required
              />
            </div>
          )}
        </div>
        {
          <div className="flex flex-col  gap-2">
             <button
              onClick={handleStartQuiz}
              className="block text-center ml-5 !w-full  bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Start Foundation Math Quiz
            </button>
            <button
              onClick={handleArtStartQuiz}
              className="block ml-5 text-center !w-full  bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Start Arts(English) Quiz
            </button>
            <button
              onClick={handleStartQuiz}
              className="block text-center ml-5 !w-full  bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Start Math Higher Quiz
            </button>
            <button
              onClick={handleArtStartQuiz}
              className="block ml-5 text-center !w-full  bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              GSCE Paper(English) Quiz
            </button>{" "}
            <button
              onClick={handleArtStartQuiz}
              className="block ml-5 text-center !w-full  bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              College Algebra Quiz
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Page;
