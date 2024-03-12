import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EXAM } from "../utils/queries";
import { useParams } from "react-router-dom";

const TakeExam = () => {
  const { examId } = useParams();
  const { loading, data } = useQuery(GET_EXAM, {
    variables: { examId },
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (loading) {
    return <div>Loading...</div>;
  }

  const exam = data?.getExam || {};

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
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
    });
    return correctCount;
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <h1 style= {{ marginTop: "20px"}}>{exam.exam_name}</h1>
      <h2>{exam.topic}</h2>
      <form>
        {exam.questions.map((question) => (
          <div key={question._id } style={{ marginBottom: "30px" }}>
            <h3 style={{ textAlign: "left"}}>{question.question_text}</h3>
            <ul>
              {question.answer_choices.map((choice, index) => (
                <li key={index} style={{ textAlign: "left" }}>
                  <input
                    type="radio"
                    id={`answer_${index}`}
                    name={`question_${question._id}`}
                    value={choice}
                    onChange={() => handleAnswerSelect(question._id, choice)}
                    checked={selectedAnswers[question._id] === choice}
                  />
                  <label htmlFor={`answer_${index}`}>{choice}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            alert(`Your score: ${calculateScore()}/${exam.questions.length}`)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TakeExam;
