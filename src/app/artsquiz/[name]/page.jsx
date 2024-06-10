"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/app/context/AuthContext";
function QuizComponent() {
  const { userAuth } = useContext(AuthContext);

  const { name } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (!loading && quizData.length > 0) {
      const marks = quizData.reduce(
        (total, question) => total + question.marks,
        0
      );
      setTotalMarks(marks);
    }
  }, [loading, quizData]);

  useEffect(() => {
    if (!loading && Object.keys(userAnswers).length > 0) {
      let correctCount = 0;
      Object.keys(userAnswers).forEach((index) => {
        const answer = userAnswers[index];
        const correctOption = quizData[index]?.quizCorrectOption;
        if (answer === correctOption) {
          correctCount++;
        }
      });
      setCorrectAnswersCount(correctCount);
      const obtained = quizData.reduce((total, question, index) => {
        const answer = userAnswers[index];
        const marks =
          answer === question.quizCorrectOption ? question.marks : 0;
        return total + marks;
      }, 0);
      setObtainedMarks(obtained);
    }
  }, [loading, userAnswers, quizData]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7114/admin/quiz/getartquiztest"
      );
      setQuizData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching quiz data: " + error.message);
      setLoading(false);
    }
  };

  const handleAnswerChange = (e, index, marks) => {
    setUserAnswers({
      ...userAnswers,
      [index]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    setShowResult(true);
    if (userAuth.userName.length > 1) {
      const response = await axios.post(
        "https://localhost:7114/admin/quiz/creatquizresults",
        {
          userName: userAuth.userName,
          type: "Arts",
          percentage: `${((obtainedMarks / totalMarks) * 100).toFixed(2)}`,
        }
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderQuiz = () => {
    if (loading) {
      return (
        <div
          className="text-center  flex-col  min-h-100 flex"
          style={{ alignItems: "center" }}
        >
          <span className="loading loading-bars mt-40 m-auto loading-lg"></span>
        </div>
      );
    }

    if (error) {
      return <div className="text-center">Error: {error}</div>;
    }

    if (quizData.length === 0) {
      return <div className="text-center">Invalid Error Try Again Later</div>;
    }

    return (
      <div className=" mx-auto  pb-5">
        <div className="max-w-lg mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Quiz Status</h1>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="font-semibold">Name:</p>
            <p>{name}</p>
            <p className="font-semibold mt-4">Total Questions:</p>
            <p>{quizData.length}</p>
            <p className="font-semibold mt-4">Total Correct Options:</p>
            <p>{correctAnswersCount}</p>
            <p className="font-semibold mt-4">Percentage:</p>
            <p>
              {totalMarks !== 0 ? (
                ((obtainedMarks / totalMarks) * 100).toFixed(2)
              ) : (
                <>
                  {obtainedMarks}\ {totalMarks}
                </>
              )}
              %
            </p>
          </div>
          {quizData.map((question, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 pb-10  mb-6"
            >
              <h2 className="text-lg font-semibold mb-2">
                Question {index + 1}
              </h2>
              <img src={`data:image/png;base64,${question.quizImage}`} alt="" />
              <h3 className="text-base mb-4">{question.quizQuestion}</h3>
              {showResult && (
                <>
                  <p className="text-green-600 mb-2">
                    Correct answer: {question.quizCorrectOption.trim()}
                  </p>
                  <p>Topic : {question.topic}</p>
                  <p>
                    Learning Resources:{" "}
                    <a
                      href={question.learningResource}
                      className="text-blue-800 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {question.learningResource}
                    </a>
                  </p>
                  <p>
                    Answer Resources:{" "}
                    <a
                      href={question.answerResource}
                      className="text-blue-800 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {question.answerResource}
                    </a>
                  </p>
                  <p>
                    Video Resources:{" "}
                    <a
                      href={question.videoResource}
                      className="text-blue-800 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {question.videoResource}
                    </a>
                  </p>
                </>
              )}
              {question.options ==
              `[{"QuizOption":""},{"QuizOption":""},{"QuizOption":""},{"QuizOption":""}]` ? (
                <input
                  type="text"
                  placeholder="Enter your answer"
                  value={userAnswers[index] || ""}
                  onChange={(e) => handleAnswerChange(e, index, question.marks)}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                />
              ) : (
                <>
                  <div className="flex flex-row gap-3">
                    {JSON.parse(question.options).map((e, optionIndex) => (
                      <div className="flex flex-row" key={optionIndex}>
                        {e.QuizOption && e.QuizOption.length > 0 && (
                          <ul className="flex  gap-2 my-2">
                            <input
                              type="radio"
                              name={`question_${index}`} // Set a unique name for each group of options
                              value={e.QuizOption}
                              onClick={(a) =>
                                handleAnswerChange(a, index, question.marks)
                              }
                            />
                            <p className="">{e.QuizOption}</p>
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {showResult &&
                userAnswers[index] !== question.quizCorrectOption.trim() && (
                  <p className="text-red-600 mb-2">Incorrect answer</p>
                )}

              {question.answerImage === "" || null ? (
                ""
              ) : (
                <>
                  {showResult && (
                    <img
                      src={`data:image/png;base64,${question.answerImage}`}
                      alt=""
                    />
                  )}
                </>
              )}
              <div className="float-right font-bold text-green-700 ">
                Marks : {question.marks}
              </div>
            </div>
          ))}
          {showResult ? (
            <Link
              href={"/quiz"}
              className="purple text-white px-5 py-3 btn rounded "
            >
              Reattempt
            </Link>
          ) : (
            <button
              onClick={handleSubmit}
              className="purple m-auto text-white px-5 py-3 btn rounded "
            >
              Submit
            </button>
          )}

          {showResult && (
            <button
              onClick={handlePrint}
              className="mt-4 block mx-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Print Report
            </button>
          )}
        </div>
      </div>
    );
  };

  return <div>{renderQuiz()}</div>;
}

export default QuizComponent;
