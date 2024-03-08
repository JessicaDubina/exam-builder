// import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries'; // Import the queryimport { _id } from '../utils/localStorage'; // Import the user id from local storage

const StudentLanding = () => {
    // const [exams, setExams] = useState([]);
    // const { _id } = useParams();

    const { loading, data } = useQuery(QUERY_USERS);
    console.log(data);
    const exams = data?.users[1].exams || {};
    
    if (loading) { 
        return <div>Loading...</div>;
    }

    return (
        <div><div>
            <h2>Welcome, Student!</h2>
            {/* Render exams */}
            <div style={{ marginLeft: '100px' }}>
            <table style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>Exams taken & grades</th>
                        </tr>
                    </thead>
                    <tbody >
                        {exams.map(exam => (
                            <tr key={exam._id}>
                                <td style={{ textAlign: 'left'}}>{exam.exam_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

           </div>
        {exams.some(exam => !exam.complete) ? (
            <Link to="/NewExam" style={{ marginTop: '10px', display: 'block' }}>Take New Exam</Link>
        ) : (
            <p>No new exams</p>
        )}
        </div>
    );
};

export default StudentLanding;