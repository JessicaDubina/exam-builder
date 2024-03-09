import { useQuery } from "@apollo/client";
import { GET_EXAM } from "../utils/queries";

const NewExam = () => {
    const { loading, error, data } = useQuery(GET_EXAM);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
  };

const handleSubmit = () => {
    // Logic to submit the answers
};

return (
    <div>
        <h2>{data.exam.name}</h2>
        <p>{data.exam.topic}</p>
        {data.exam.questions.map((question, index) => (
            <div key={index}>
                <h3>{question.questionText}</h3>
                {question.answerChoices.map((choice, index) => (
                    <div key={index}>
                        <input type="checkbox" id={`choice-${index}`} name={`choice-${index}`} value={choice} />
                        <label htmlFor={`choice-${index}`}>{choice}</label>
                    </div>
                ))}
            </div>      
        ))}
        <button onClick={handleSubmit}>Submit</button>
    </div>
);
export default NewExam;
