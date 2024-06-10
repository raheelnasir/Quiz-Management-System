"use client";
import React, { useState, useEffect, useContext } from "react";
import Modal from "@mui/material/Modal";
import AdminLayout from "@/app/layouts/AdminLayout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

function QuizComponent() {
  const { userAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (userAuth && userAuth.userRole === "Admin") {
      console.log("Admin user");
    } else {
      router.push("/");
    }
  }, []);
  const [quizDetails, setQuizDetails] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const fetchQuizDetails = async () => {
    try {
      const response = await fetch("https://localhost:7114/admin/quiz/getquiz");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Parse the options string into an array of objects
        data.forEach((item) => {
          item.options = JSON.parse(item.options);
        });
        setQuizDetails(data);
      } else {
        console.error("Failed to fetch quiz details");
      }
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    }
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const handleCloseModal = async () => {
    console.log(selectedQuestion.quizId);
    const response = await axios.get(
      `https://localhost:7114/admin/quiz/deletebyid?guid=${selectedQuestion.quizId}`,
      { timeout: 15000 }
    );
    if (response.data === 201) {
      setSelectedQuestion(null);
      setModalOpen(false);
      fetchQuizDetails();
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quizDetails.map((quiz, index) => (
          <div key={index} className="rounded-lg bg-white shadow-md p-6">
            <h2 className="text-xl font-semibold">{quiz.quizQuestion}</h2>
            <img
              className="mt-4 w-full  object-cover rounded"
              src={`data:image/png;base64,${quiz.quizImage}`}
              alt="Quiz Image"
            />
            <h3>Learning Resource: {quiz.learningResource}</h3>
            <h3>Video Resource: {quiz.videoResource}</h3>
            <h3>Answer Resource: {quiz.answerResource}</h3>

            <h3 className="mt-4">Question Title: {quiz.quizTitle}</h3>
            <h3>Correct Option: {quiz.quizCorrectOption}</h3>
            <h3 className="mt-2 text-lg font-semibold">Options:</h3>
            <ul className="mt-1 list-disc list-inside">
              {quiz.options[0].toString().length > 1 &&
                quiz.options.map(
                  (option, index) =>
                    option.QuizOption.length > 1 && (
                      <li key={index}>{option.QuizOption}</li>
                    )
                )}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleEditQuestion(quiz)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="bg-white p-4 rounded-lg w-full max-w-lg">
            <h3 className="font-bold text-lg">Edit Question</h3>
            <p className="py-4">
              Selected Question:{" "}
              {selectedQuestion && selectedQuestion.quizQuestion}
            </p>
            <input
              type="text"
              value={selectedQuestion && selectedQuestion.quizQuestion}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

export default QuizComponent;
