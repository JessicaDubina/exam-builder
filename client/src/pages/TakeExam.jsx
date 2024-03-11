import { useQuery } from '@apollo/client';
import { GET_EXAM } from '../utils/queries'; // Import the queryimport { _id } from '../utils/localStorage'; // Import the user id from local storage
import { useParams } from 'react-router-dom';

const TakeExam = () => {
    const { examId } = useParams();
    console.log(examId);
    const { loading, data } = useQuery(GET_EXAM, {
        variables: { examId }
    });
    const exam = data?.getExam || {};
    console.log(data);
    return (
        <div>
            <h1>{exam.exam_name}</h1>
        </div>
    );
};

export default TakeExam;