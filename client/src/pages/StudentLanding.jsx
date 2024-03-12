import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME, QUERY_USERS } from "../utils/queries";

const StudentLanding = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const exams = data?.me.exams || [];
  const completedExams = exams.filter((exam) => exam.completed);
  const uncompletedExams = exams.filter((exam) => !exam.completed);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 className="page-title">Welcome!</h2>

{/* Render completed exams */}
{/* If there are completed exams, print them */}
<div className="page-container" style={{justifyContent: "center"}}>

  <div className="segment" style={{justifyContent: "center", padding: "1rem"}}>
{completedExams.length > 0 ? (
    <div >
      <h3 className="table-title">Completed Exams: {completedExams.length}</h3>
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
    <div className="segment" style={{justifyContent: "center", padding: "1rem"}}>
    <h3 className="table-title">Completed Exams:</h3>
    <p >No completed exams</p>
  </div>
  )}
    </div>  

 {/* Render uncompleted exams */}
 {/* If there are uncompleted exams, print them */}
 <div className="segment" style={{justifyContent: "center", padding: "1rem"}}>
 {uncompletedExams.length > 0 ? (
    <div >
      <h3 className="table-title">Uncompleted Exams: {uncompletedExams.length}</h3>
      <table >
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
    <div>
    <h3 className="table-title">Uncompleted Exams:</h3>
    <p >All exams done!</p>
  </div>
  )}
  </div>
  
  <div className="segment" style={{justifyContent: "center", padding: "1rem"}}>
   <div>
        <h3 className="table-title">Overall Grade:</h3>
        <p >{data.me.grade}%</p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default StudentLanding;
