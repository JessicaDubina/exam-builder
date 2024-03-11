// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../path/to/your/queries';

const StudentList = () => {
    const { loading, error, data } = useQuery(QUERY_USERS);
    const users = data?.users.filter(instructor => instructor.false) || [];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Students</h2>
            <div>
                {users.map(user => (
                    <div key={user.username}>
                        <h3>{user.username}</h3>
                        <p>Email: {user.email}</p>
                        <p>Exams:</p>
                        <ul>
                            {user.exams.map((exam, index) => (
                                <li key={index}>
                                    Completed: {exam.completed ? 'Yes' : 'No'}, Grade: {exam.grade}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentList;