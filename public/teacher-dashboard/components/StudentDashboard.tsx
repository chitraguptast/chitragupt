import { useParams } from "react-router-dom";

const StudentDashboard = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p>Student ID: {id}</p>
    </div>
  );
};

export default StudentDashboard;
