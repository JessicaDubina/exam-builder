import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries'; // Import the queryimport { _id } from '../utils/localStorage'; // Import the user id from local storage

const StudentLanding = () => {
    const [exams, setExams] = useState([]);
    // const { _id } = useParams();

    const { loading, data } = useQuery(QUERY_USERS);

    useEffect(() => {
        if (!loading && data) {
            setExams(data.exams);
        }
    }, [loading, data]);


    return (
        <div>
            {/* Render exams */}
            {exams.map(exam => (
                <div key={exam.id}>
                    <p>Exam: {exam.name}</p>
                    {/* <p>Grade: {exam.grade}</p> */}
                </div>
            ))}
            <Link to="/NewExam">Take New Exam</Link>
        </div>
    );
};

export default StudentLanding;