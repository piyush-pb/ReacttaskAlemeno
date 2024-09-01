import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import StudentDashboard from './components/StudentDashboard';
import { Button } from '@mui/material';

function App() {
  return (
    <div>
      <Router>
        <Button as={Link} to="/dashboard" className='inline-block fixed top-[20px] right-[20px]'>
          <p className='ml-[20px] text-blue-600'>Go to Dashboard</p>
        </Button>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
