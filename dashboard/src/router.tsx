import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFound';
import StartPage from './pages/Start';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import AnnouncementsPage from './pages/Announcements';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import Students from './pages/Students';
import CreateStudent from './pages/CreateStudent';
import CreateAnnouncement from './pages/CreateAnnouncement';
import ViewStudent from './pages/ViewStudent';
import UpdateStudent from './pages/UpdateStudent';
import Teachers from './pages/Teachers';
import CreateTeacher from './pages/CreateTeacher';
import Courses from './pages/Courses';
import CreateCourse from './pages/CreateCourse';
import UpdateCourse from './pages/UpdateCourse';
import TeacherLogin from './pages/TeacherLogin';
import RequireAuth from './components/RequiredAuth';
import UnauthorizedPage from './pages/UnAuthorized';
import UpdateTeacher from './pages/UpdateTeacher';
import StaffAnnouncements from './pages/StaffAnnouncements';
import UpdateAnnouncement from './pages/UpdateAnnouncement';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherViewStudent from './pages/TeacherViewStudent';
import AssignStudentDegree from './pages/AssignStudentDegrees';
import StudyTables from './pages/StudyTables';
import ViewTable from './pages/ViewTable';
import CreateTable from './pages/CreateTable';
import UpdateStudyTable from './pages/UpdateStudyTable';
import Staffs from './pages/Staffs';
import CreateStaff from './pages/CreateStaff';
import UpdateStaff from './pages/UpdateStaff';
import ViewTeacher from './pages/ViewTeacher';
import StudentDegrees from './pages/StudentDegrees';
import StudentTable from './pages/StudentTable';


const AppRouter: React.FC = () => {
  return (
    <Routes>
          <Route path='/' element={<StartPage />} />
          
          <Route path='/students/:id/announcements' element={
            <RequireAuth rule='student'>
              <AnnouncementsPage />
            </RequireAuth>
          } />
          
          <Route path='/students/:id/degrees' element={
            <RequireAuth rule='student'>
              <StudentDegrees />
            </RequireAuth>
          } />
          
          <Route path='/students/:id/table' element={
            <RequireAuth rule='student'>
              <StudentTable />
            </RequireAuth>
          } />



          <Route path='/staffs/:id/announcements' element={
            <RequireAuth rule='staff'>
              <StaffAnnouncements />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/announcements/create' element={
            <RequireAuth rule='staff'>
              <CreateAnnouncement />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/announcements/:aid/update' element={
            <RequireAuth rule='staff'>
              <UpdateAnnouncement />
            </RequireAuth>
          } />

          <Route path='/student/login' element={<StudentLogin />} />
          <Route path='/students/:id/dashboard' element={
            <RequireAuth rule='student'>
              <StudentDashboard />
            </RequireAuth>
          } />

          <Route path='/teacher/login' element={<TeacherLogin />} />
          <Route path='/teachers/:id/dashboard' element={
            <RequireAuth rule='teacher'>
              <TeacherDashboard />
            </RequireAuth>
          } />
          <Route path='/teachers/:id/students/:sid' element={
            <RequireAuth rule='teacher'>
              <TeacherViewStudent />
            </RequireAuth>
          } />

          <Route path='/teachers/:id/students/:sid/degrees' element={
            <RequireAuth rule='teacher'>
              <AssignStudentDegree />
            </RequireAuth>
          } />

          <Route path='/staff/login' element={<StaffLogin />} />
          <Route path='/staffs/:id/dashboard' element={
            <RequireAuth rule='staff'>
              <StaffDashboard />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/teachers' element={
            <RequireAuth rule='staff'>
              <Teachers />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/teachers/create' element={
            <RequireAuth rule='staff'>
              <CreateTeacher />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/teachers/:tid/update' element={
            <RequireAuth rule='staff'>
              <UpdateTeacher />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/teachers/:tid' element={
            <RequireAuth rule='staff'>
              <ViewTeacher />
            </RequireAuth>
          } />

          
          <Route path='/staffs/:id/tables' element={
            <RequireAuth rule='staff'>
              <StudyTables />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/tables/:tid/view' element={
            <RequireAuth rule='staff'>
              <ViewTable />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/tables/create' element={
            <RequireAuth rule='staff'>
              <CreateTable />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/tables/:tid/update' element={
            <RequireAuth rule='staff'>
              <UpdateStudyTable />
            </RequireAuth>
          } />

          <Route path='/staffs/:id/staffs' element={
            <RequireAuth rule='staff'>
              <Staffs />
            </RequireAuth>
          } />
          {/* <Route path='/staffs/:id/staffs/:sid/view' element={<ViewTable />} /> */}
          <Route path='/staffs/:id/staffs/create' element={
            <RequireAuth rule='staff'>
              <CreateStaff />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/staffs/:sid/update' element={
            <RequireAuth rule='staff'>
              <UpdateStaff />
            </RequireAuth>
          } />

          <Route path='/staffs/:id/courses' element={
            <RequireAuth rule='staff'>
              <Courses />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/courses/:id' element={
            <RequireAuth rule='staff'>
              <ViewStudent />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/courses/:id/update' element={
            <RequireAuth rule='staff'>
              <UpdateCourse />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/courses/create' element={
            <RequireAuth rule='staff'>
              <CreateCourse />
            </RequireAuth>
          } />


          <Route path='/staffs/:id/students' element={
            <RequireAuth rule='staff'>
              <Students />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/students/:sid' element={
            <RequireAuth rule='staff'>
              <ViewStudent />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/students/:sid/update' element={
            <RequireAuth rule='staff'>
              <UpdateStudent />
            </RequireAuth>
          } />
          <Route path='/staffs/:id/students/create' element={
            <RequireAuth rule='staff'>
              <CreateStudent />
            </RequireAuth>
          } />

          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
