
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const StudentLanding = () => {
    const { loading, data } = useQuery(GET_ME);
    console.log(data);

    if (loading) { 
        return <div>Loading...</div>;
    }

    const exams = data?.me.exams || [];
    const completedExams = exams.filter(exam => exam.completed);
    const uncompletedExams = exams.filter(exam => !exam.completed);
   console.log(uncompletedExams);
    return (
        <div>
            <h2>Welcome, Student!</h2>

            {/* Render completed exams */}
            <div style={{ marginLeft: '100px' }}>
                <h3>Completed Exams:{completedExams.length}</h3>
                <table style={{ width: '100%' }}>
                    <tbody>
                        {completedExams.map(exam => (
                            <tr key={exam._id}>
                                <td style={{ textAlign: 'left' }}>{exam.exam_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render uncompleted exams */}
            {uncompletedExams.length > 0 ? (
                <div style={{ marginLeft: '100px' }}>
                    <h3>Uncompleted Exams: {uncompletedExams.length}</h3>
                    <ul>
                        {uncompletedExams.map(exam => (
                            <li key={exam._id}>
                                <Link to = {`/exam/${exam._id}`}>{exam.exam.exam_name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No uncompleted exams</p>
            )}

            {/* Render link to take new exam */}
            {uncompletedExams.length > 0 && (
                <Link to="/NewExam" style={{ marginTop: '10px', display: 'block' }}>Take New Exam</Link>
            )}
        </div>
    );
};

export default StudentLanding;


// // import  { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GET_ME } from '../utils/queries'; // Import the queryimport { _id } from '../utils/localStorage'; // Import the user id from local storage

// const StudentLanding = () => {
//     // const [exams, setExams] = useState([]);
//     // const { _id } = useParams();

//     const { loading, data } = useQuery(GET_ME);
//     console.log(data);
//     const exams = data?.me.exams.filter(exam => exam.completed) || [];
    
//     if (loading) { 
//         return <div>Loading...</div>;
//     }

//     return (
//         <div><div>
//             <h2>Welcome, Student!</h2>
//             {/* Render exams */}
//             <div style={{ marginLeft: '100px' }}>
//             <table style={{width: '100%'}}>
//                     <thead>
//                         <tr>
//                             <th style={{textAlign: 'left'}}>Exams taken & grades</th>
//                         </tr>
//                     </thead>
//                     <tbody >
//                         {exams.map(exam => (
//                             <tr key={exam._id}>
//                                 <td style={{ textAlign: 'left'}}>{exam.exam_name}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 </div>

//            </div>
//         {exams.some(exam => !exam.complete) ? (
//             <Link to="/NewExam" style={{ marginTop: '10px', display: 'block' }}>Take New Exam</Link>
//         ) : (
//             <p>No new exams</p>
//         )}
//         </div>
//     );
// };

// export default StudentLanding;