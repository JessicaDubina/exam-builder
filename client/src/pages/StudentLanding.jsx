import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME, QUERY_USERS } from "../utils/queries";

const StudentLanding = () => {
  const { loading, data } = useQuery(GET_ME);
  const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const exams = data?.me.exams || [];
  const completedExams = exams.filter((exam) => exam.completed);
  const uncompletedExams = exams.filter((exam) => !exam.completed);

  return (
    <div>
      <h2>Welcome!</h2>

{/* Render completed exams */}
{/* If there are completed exams, print them */}
{completedExams.length > 0 ? (
    <div style={{ marginLeft: "100px", marginBottom: "50px"}}>
      <h3 style={{ textAlign: "left", marginBottom: "10px" }}>Completed Exams: {completedExams.length}</h3>
      <table style={{ width: "100%" }}>
        <tbody>
          {completedExams.map((exam) => (
            <tr key={exam._id}>
              <td style={{ textAlign: "left" }}>{exam.exam.exam_name}, grade: {exam.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    // If there are no completed exams, print this message
    <div style={{ marginLeft: "100px", marginBottom: "50px" }} >
    <h3 style={{ textAlign: "left", marginBottom: "10px" }}>Completed Exams:</h3>
    <p style={{ textAlign: "left" }}>No completed exams</p>
  </div>
  )}
      

 {/* Render uncompleted exams */}
 {/* If there are uncompleted exams, print them */}
 {uncompletedExams.length > 0 ? (
    <div style={{ marginLeft: "100px" }}>
      <h3 style={{ textAlign: "left", marginBottom: "10px"}}>Uncompleted Exams: {uncompletedExams.length}</h3>
      <table style={{ width: "50%", float: "left" }}>
        <tbody>
          {uncompletedExams.map((exam) => (
            <tr key={exam._id}>
              <td style={{ textAlign: "left" }}>
                <Link to={`/exam/${data.me._id}/${exam.exam._id}`}>{exam.exam.exam_name}</Link>
                <Link to={`${data.me.grade}`}></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div style={{ marginLeft: "100px" }}>
    <h3 style={{ textAlign: "left", marginBottom: "10px" }}>Uncompleted Exams:</h3>
    <p style={{ textAlign: "left" }}>All exams done!</p>
  </div>
  )}
  
   <div style={{ marginLeft: "100px" }}>
        <h3 style={{ textAlign: "left", marginBottom: "10px" }}>Overall Grade:</h3>
        <p style={{ textAlign: "left" }}>{data.me.grade}%</p>
      </div>
    </div>
  );
};

export default StudentLanding;
