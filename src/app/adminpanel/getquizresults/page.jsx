"use client";
import Request from "@/Request";
import { AuthContext } from "@/app/context/AuthContext";
import AdminLayout from "@/app/layouts/AdminLayout";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { userAuth } = useContext(AuthContext);
  const [quizResult, setQuizResults] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (userAuth && userAuth.userRole === "Admin") {
      console.log("Admin user");
    } else {
      router.push("/");
    }
    const fetchQuizResults = async () => {
      try {
        const res = await Request.get("/admin/quiz/getquizresults");
        console.log(res.data);  
        setQuizResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizResults();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quizResult.map((e, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">UserName : {e.userName}</h2>
                <p className="text-gray-600 mb-2">Percentage: {e.percentage}</p>
                <p className="text-gray-600 mb-2">Type: {e.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
