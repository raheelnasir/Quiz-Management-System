"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/layouts/AdminLayout";
import { useParams, useRouter } from "next/navigation";

function QuizApp() {
  const quiz = useParams();
  const { userAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (userAuth && userAuth.userRole === "Admin") {
      console.log("Admin user");
    } else {
      router.push("/");
    }},[])
  const [questions, setQuestions] = useState([
    {
      question: "kdsm,a",
      quizUniqueId: quiz.quizid || "243",
      image: null,
      options: ["", "", "", ""],
      correctOption: "jasdk",
      learningResource: "msad,",
      quizTitle: "Additional Question",
      questiontitle: "Rahr",
    },
  ]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleImageChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].image = event.target.files[0];
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOption = event.target.value;
    setQuestions(newQuestions);
  };

  const handleLearningResourceChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].learningResource = event.target.value;
    setQuestions(newQuestions);
  };
  const questionTitleChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questiontitle = event.target.value;
    setQuestions(newQuestions);
  };

  const handleQuizTitleChange = (event) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => ({
        ...question,
        quizTitle: event.target.value,
      }));
    });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        image: null,
        options: ["", "", "", ""],
        correctOption: "",
        learningResource: "",
        quizTitle: "Quiz 1",
      },
    ]);
  };

  const handleSubmit = async () => {
    console.log(questions);
    try {
      // Convert image files to Base64 strings
      const formattedQuestions = await Promise.all(
        questions.map(async (q) => {
          if (q.image) {
            return {
              ...q,
              image: await convertImageToBase64(q.image),
            };
          } else {
            return q; // If no image is uploaded, return the question as it is
          }
        })
      );

      const response = await axios.post(
        "https://localhost:7114/admin/quiz/uploadquizbyid",
        [
          {
            Question: "string",
            QuizUniqueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            QuizTitle: "string",
            Image: questions[0].image,
            Options: questions[0].options ,
            CorrectOption: "string",
            LearningResource: "string",
            QuestionTitle: "string",
          },
        ]
      );
      if (response.status === 200) {
        console.log("Quiz submitted successfully");
      } else {
        console.error("Quiz submission failed");
      }
    } catch (error) {
      console.error("Error submitting quiz", error);
    }
  };

  // Function to convert image file to Base64 string
  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Create Quiz
          </h1>

          {questions.map((q, index) => (
            <div key={index} className="mb-6">
              <textarea
                className="w-full px-3 py-2 border rounded-md mb-2"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder="Enter question..."
              />
              <input
                type="file"
                onChange={(e) => handleImageChange(index, e)}
                className="mb-2"
              />
              <input
                value={q.correctOption}
                onChange={(e) => handleCorrectOptionChange(index, e)}
                className="w-full px-3 py-2 border rounded-md mb-2"
                placeholder="Enter correct option..."
              />
              <input
                value={q.questiontitle}
                onChange={(e) => questionTitleChange(index, e)}
                className="w-full px-3 py-2 border rounded-md mb-2"
                placeholder="Enter Quiz Resource..."
              />
              {q.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  className="w-full px-3 py-2 border rounded-md mb-2"
                  placeholder={`Enter option ${optionIndex + 1}...`}
                />
              ))}
              <input
                value={q.learningResource}
                onChange={(e) => handleLearningResourceChange(index, e)}
                className="w-full px-3 py-2 border rounded-md mb-2"
                placeholder="Enter learning resource..."
              />
            </div>
          ))}
          <div className="text-center">
            <button
              onClick={addQuestion}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add Question
            </button>
            <button
              onClick={handleSubmit}
              className="purple  text-white font-bold py-2 px-4 rounded"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default QuizApp;
