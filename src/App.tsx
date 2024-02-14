
import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InstructorCourseDetails from './components/Instructor/CourseDetails'
import InstructorCoursesList from './components/Instructor/CourseList'
import StudentNavbar from './components/Student/NavBar';
import StudentCoursesList from './components/Student/CourseList';
import StudentCourseDetails from './components/Student/CourseDetails';
import Dashboard from './components/Student/Dashboard';
import StudentCourseDetailsWithSave from './components/Student/SaveCourse';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Instructor/NavBar';
import { useAppSelector } from './redux/store';


const App: React.FC = () => {
  const role = useAppSelector(state => state.auth.role);
  console.log(role);
  return (
    <div className=' w-dvw h-dvh flex flex-col items-center '>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={
            role === 'instructor'
              ? <Navbar />
              : role === 'student'
                ? <StudentNavbar />
                : null
          }
        />
        {/* student routes */}

        <Route path="/student/dashboard" element={<PrivateRoute allowedUserTypes={['student']}>< StudentNavbar />< Dashboard /></PrivateRoute>} />
        <Route path="/student/courses" element={<PrivateRoute allowedUserTypes={['student']}>< StudentNavbar />< StudentCoursesList /></PrivateRoute>} />
        <Route path="/student/courses/:id" element={<PrivateRoute allowedUserTypes={['student']}>< StudentNavbar />< StudentCourseDetails /></PrivateRoute>} />
        <Route path="/courses/:id" element={<PrivateRoute allowedUserTypes={['student']}>< StudentNavbar />< StudentCourseDetailsWithSave /></PrivateRoute>} />


        <Route path="/instructor/courses" element={<PrivateRoute allowedUserTypes={['instructor']}>< Navbar />< InstructorCoursesList /></PrivateRoute>} />
        <Route path="/instructor/courses/:id" element={<PrivateRoute allowedUserTypes={['instructor']}>< Navbar />< InstructorCourseDetails /></PrivateRoute>} />


      </Routes>
    </div>
  );
};

export default App
