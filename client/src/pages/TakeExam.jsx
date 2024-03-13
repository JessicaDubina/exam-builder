import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXAM } from "../utils/queries";
import { useParams, useNavigate } from "react-router-dom";
import { UPDATE_EXAM_GRADE } from "../utils/mutations";

const TakeExam = () => {
  const navigate = useNavigate();
  const { userId, examId } = useParams();
  const { loading, data } = useQuery(GET_EXAM, {
    variables: { examId },
  });
  console.log(data);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [updateExamGrade] = useMutation(UPDATE_EXAM_GRADE);
  if (loading) {
    return <div>Loading...</div>;
  }

  const exam = data?.getExam || {};

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
    console.log("Selected Answers:", selectedAnswers);
  };

  const calculateScore = () => {
    let correctCount = 0;
    exam.questions.forEach((question) => {
      const selectedAnswerIndex = question.answer_choices.findIndex(
        (choice) => choice === selectedAnswers[question._id]
      );
      if (selectedAnswerIndex === question.correct_answer) {
        correctCount++;
      }
      console.log("Correct Count:", correctCount);
    });
    return correctCount;
  };
  const handleSubmit = async () => {
    const grade = (calculateScore() / exam.questions.length) * 100; // Calculate grade as a floating number
    try {
      console.log("examId:", examId);
      console.log("grade:", grade);
      console.log("userId:", userId);
      await updateExamGrade({ variables: { userId, examId, grade } }); // Call the mutation function
      alert("Exam grade submitted successfully!");
      navigate("/student");
    } catch (error) {
      console.error("Error submitting exam grade:", error);
      alert("Failed to submit exam grade. Please try again later.");
    }
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <h1 style={{ marginTop: "20px" }}>{exam.exam_name}</h1>
      <h2>{exam.topic}</h2>
      <form>
        {exam.questions.map((question) => (
          <div key={question._id} style={{ marginBottom: "30px" }}>
            <h3 style={{ textAlign: "left" }}>{question.question_text}</h3>
            <ul className="selection-box">
              {question.answer_choices.map((choice, index) => (
                <li key={index} style={{ textAlign: "left" }}>
                  <input
                    type="radio"
                    id={`${question._id}_answer_${index}`}
                    name={`question_${question._id}`}
                    value={choice}
                    onChange={() => handleAnswerSelect(question._id, choice)}
                    checked={selectedAnswers[question._id] === choice}
                  />
                  <label htmlFor={`${question._id}_answer_${index}`}>{choice}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TakeExam;
