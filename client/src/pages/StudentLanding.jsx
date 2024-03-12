import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME, QUERY_USERS } from "../utils/queries";

const StudentLanding = () => {
  const { userId } = useParams();
  console.log("User ID:", userId); // Log the userId to check if it's correctly retrieved from the URL
  const { loading, data } = useQuery(userId ? QUERY_USERS : GET_ME, {
    variables: { userId },
  });
  // console.log("Loading:", loading); // Log the loading state of the query
  // console.log("Query Data:", data); // Log the data fetched by the query

  if (loading) {
    // Render a loading state while data is being fetched
    return <div>Loading...</div>;
  }

  // Check if data exists before accessing it
  const userData = userId
  ? data.users.find(user => user._id === userId)
  : data.me;
  console.log("Query Data:", data); // Log the entire data object to inspect its structure
  console.log("User Data:", userData); // Log the user data fetched by the query

  if (!userData) {
    // Render an error message if userData is not available
    return <div>Error: User data not found</div>;
  }

  const exams = userData?.exams || [];
  const completedExams = exams.filter((exam) => exam.completed);
  const uncompletedExams = exams.filter((exam) => !exam.completed);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 className="page-title">Welcome!</h2>

      <div className="page-container" style={{ justifyContent: "center" }}>
        {/* Render completed exams */}
        <div className="segment" style={{ justifyContent: "center", padding: "1rem" }}>
          {completedExams.length > 0 ? (
            <div>
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
            <div className="segment" style={{ justifyContent: "center", padding: "1rem" }}>
              <h3 className="table-title">Completed Exams:</h3>
              <p>No completed exams</p>
            </div>
          )}
        </div>

        {/* Render uncompleted exams */}
        <div className="segment" style={{ justifyContent: "center", padding: "1rem" }}>
          {uncompletedExams.length > 0 ? (
            <div>
              <h3 className="table-title">Uncompleted Exams: {uncompletedExams.length}</h3>
              <table>
                <tbody>
                  {uncompletedExams.map((exam) => (
                    <tr key={exam._id}>
                      <td style={{ textAlign: "left" }}>
                        <Link to={`/exam/${userData._id}/${exam.exam._id}`}>{exam.exam.exam_name}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <h3 className="table-title">Uncompleted Exams:</h3>
              <p>All exams done!</p>
            </div>
          )}
        </div>

        {/* Render overall grade */}
        <div className="segment" style={{ justifyContent: "center", padding: "1rem" }}>
          <div>
            <h3 className="table-title">Overall Grade:</h3>
            <p>{userData.grade}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLanding;
