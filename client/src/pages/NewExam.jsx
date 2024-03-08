import { useQuery } from "@apollo/client";
import { GET_EXAM } from "../utils/queries";

const NewExam = () => {
    const { loading, error, data } = useQuery(GET_EXAM);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
  };

  return (
    <div>
      <h2>{data.exam.name}</h2>
      <p>{data.exam.topic}</p>
      {data.exam.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.questionText}</h3>
          {question.answerChoices.map((choice, index) => (
            <p key={index}>{choice}</p>
          ))}
        </div>
      ))}
    </div>
  );
export default NewExam;
