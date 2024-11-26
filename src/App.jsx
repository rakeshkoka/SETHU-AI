import CourseContent from "./components/superAdmin/Dashboard/content/courseContent/CourseContent";
import DashboardContent from "./components/superAdmin/Dashboard/content/dashboardContent/DashBoardContent";
import ReportsAndAnalytics from "./components/superAdmin/Dashboard/content/reports&Analytics/ReportsAndAnalytics";
import Settings from "./components/superAdmin/Dashboard/content/settings/Settings";
import UserManagementContent from "./components/superAdmin/Dashboard/content/userManagementContent/UserManagementContent";
import HomePage from "./pages/superAdmin/HomePage.jsx"
import { Route, Routes } from "react-router-dom";
import Student from "./components/superAdmin/Dashboard/content/userManagementContent/student/Student.jsx"
import Admin from "./components/superAdmin/Dashboard/content/userManagementContent/admin/Admin.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<DashboardContent />} />
          <Route path="userManagement" element={<UserManagementContent />} />
          <Route path="courses" element={<CourseContent />} />
          <Route path="reports" element={<ReportsAndAnalytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/student-management" element={<Student />} />
          <Route path="/admin-management" element={<Admin />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
