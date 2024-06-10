"use client";
import React, { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/layouts/AdminLayout";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

function QuizApp() {
  const { userAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (userAuth.userRole === "Admin") {
      console.log("Admin user");
    } else {
      router.push("/");
    }
  }, []);
  const [questions, setQuestions] = useState([
    {
      question: "",
      image: null,
      options: ["", "", "", ""],
      correctOption: "",
      marks: 0,
      learningResource: "",
      answerImage: null,
      videoResource: "",
      answerResource: "",
      quizTitle: "Numbers",
      questiontitle: "",
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

  const handleMarksChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].marks = event.target.value;
    setQuestions(newQuestions);
  };

  const handleLearningResourceChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].learningResource = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerImageChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].answerImage = event.target.files[0];
    setQuestions(newQuestions);
  };

  const handleVideoResourceChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].videoResource = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerResourceChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].answerResource = event.target.value;
    setQuestions(newQuestions);
  };

  const questionTitleChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questiontitle = event.target.value;
    setQuestions(newQuestions);
  };

  const handleQuizTitleChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].quizTitle = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        image: null,
        options: ["", "", "", ""],
        correctOption: "",
        marks: 0,
        learningResource: "",
        answerImage: null,
        videoResource: "",
        answerResource: "",
        quizTitle: "Numbers",
        questiontitle: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    console.log(questions);
    try {
      const formattedQuestions = await Promise.all(
        questions.map(async (q) => {
          if (q.image) {
            q.image = await convertImageToBase64(q.image);
          }
          if (q.answerImage) {
            q.answerImage = await convertImageToBase64(q.answerImage);
          }
          return q;
        })
      );

      const response = await axios.post(
        "https://localhost:7114/admin/quiz/upload",
        formattedQuestions,
        { timeout: 15000 }
      );
      if (response.status === 200) {
        console.log("Quiz submitted successfully");
        router.push('/adminpanel/getquiz')

      } else {
        console.error("Quiz submission failed");
      }
    } catch (error) {
      console.error("Error submitting quiz", error);
    }
  };

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
      <div className="container mx-auto bg-base-200">
        <div className="max-w-xl mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Create Quiz
          </h1>
          {questions.map((q, index) => (
            <div key={index} className="mb-6">
              <label className="block mb-2 font-semibold">
                Quiz Title
                <select
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  onChange={(e) => handleQuizTitleChange(index, e)}
                  defaultValue={q.quizTitle}
                >
                  {[
                    "Arts",
                    "English",
                    "Science",
                  ].map((title, index) => (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2 font-semibold">
                Question
                <textarea
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Enter question..."
                />
              </label>
              <label className="block mb-2 font-semibold">
                Question Image
                <input
                  type="file"
                  onChange={(e) => handleImageChange(index, e)}
                  className="mt-1"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Correct Option
                <input
                  value={q.correctOption}
                  onChange={(e) => handleCorrectOptionChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Enter correct option..."
                />
              </label>
              <label className="block mb-2 font-semibold">
                Marks
                <input
                  value={q.marks}
                  type="number"
                  onChange={(e) => handleMarksChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Enter marks..."
                />
              </label>
              <label className="block mb-2 font-semibold">
                Question Title
                <input
                  value={q.questiontitle}
                  onChange={(e) => questionTitleChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Enter Question Title..."
                />
              </label>
              {q.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block mb-2 font-semibold">
                  Option {optionIndex + 1}
                  <input
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                    className="w-full px-3 py-2 border rounded-md mt-1"
                    placeholder={`Enter option ${optionIndex + 1}...`}
                  />
                </label>
              ))}
              <label className="block mb-2 font-semibold">
                Learning Resource
                <input
                  value={q.learningResource}
                  onChange={(e) => handleLearningResourceChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Enter learning resource..."
                />
              </label>
              <label className="block mb-2 font-semibold">
                Answer Image
                <input
                  type="file"
                  onChange={(e) => handleAnswerImageChange(index, e)}
                  className="mt-1"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Video Resource
                <input
                  value={q.videoResource}
                  onChange={(e) => handleVideoResourceChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Enter video resource URL..."
                />
              </label>
              <label className="block mb-2 font-semibold">
                Answer Resource
                <input
                  value={q.answerResource}
                  onChange={(e) => handleAnswerResourceChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Enter answer resource URL..."
                />
              </label>
            </div>
          ))}
          <div className="text-center">
            <button onClick={addQuestion} className="btn outline-button">
              Add Question
            </button>
            <button
              onClick={handleSubmit}
              className="purple text-white font-bold py-2 btn ml-8 rounded"
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
