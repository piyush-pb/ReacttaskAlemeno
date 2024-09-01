// StudentDashboard.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markCourseAsCompleted, removeCourseFromCompleted, removeEnrollment } from '../redux/actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const allCourses = useSelector((state) => state.allCourses);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(allCourses);
  }, [allCourses]);

  const enrolledCourses = useSelector((state) => state.enrolledCourses);
  const completedCourses = useSelector((state) => state.completedCourses);
  const dispatch = useDispatch();

  const removeFromEnrolledCourses = (courseId) => {
    dispatch(removeEnrollment(courseId));
  };

  return (
    <div>
      <div>
        <h1 className='m-[20px] text-3xl uppercase font-semibold'>Student Dashboard</h1>
        <Link className='inline-block' to="/"><p className='ml-[20px] text-blue-600'><ArrowBackIcon />&nbsp;Back to Course List</p></Link>
        <Typography gutterBottom variant="h4" component="div" style={{ margin: "20px" }}>
          <b className='uppercase'>Enrolled Courses</b>
        </Typography>

        <div className='flex flex-wrap justify-start'>
          {enrolledCourses.map((course) => (
            <Card sx={{ width: 430, margin: 2 }} key={course.id} >
              <Link to={`/course/${course.id}`}>
                <CardMedia
                  sx={{ height: 230 }}
                  image={course.thumbnail}
                  title="Course Thumbnail"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    By - {course.instructor} <br />
                    Status: {course.enrollmentStatus} <br />
                    Due Date: {course.dueDate} <br />
                    Progress: {course.progress}%
                  </Typography>
                </CardContent>
                <LinearProgress variant="determinate" value={course.progress} />
              </Link>
              <CardActions className='flex justify-between'>
                <Button color='error' style={{ margin: "5px" }} variant="contained" size="small" onClick={() => removeFromEnrolledCourses(course.id)}>
                  Unenroll
                </Button>
                <Button
                  color='success'
                  style={{ margin: "5px" }}
                  variant="contained"
                  size="small"
                  onClick={() => dispatch(markCourseAsCompleted(course.id))}
                  disabled={course.completed}
                >
                  Mark as Completed
                </Button>
                <Typography variant="body2" color="text.secondary">
                  <FavoriteBorderIcon color='primary' /> {course.likes}
                </Typography>
              </CardActions>
            </Card>
          ))}
        </div>

        <Typography gutterBottom variant="h4" component="div" style={{ margin: "20px" }}>
          <b className='uppercase'>Completed Courses</b>
        </Typography>
        <div className='flex flex-wrap justify-start'>
          {completedCourses.map((courseId) => {
            const course = allCourses.find((c) => c.id === courseId);
            return (
              <Card sx={{ width: 430, margin: 2 }} key={course.id} >
                <Link to={`/course/${course.id}`}>
                  <CardMedia
                    sx={{ height: 230 }}
                    image={course.thumbnail}
                    title="Course Thumbnail"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      By - {course.instructor} <br />
                      Status: {course.enrollmentStatus} <br />
                      Due Date: {course.dueDate} <br />
                      Progress: {course.progress}%
                    </Typography>
                  </CardContent>
                  <LinearProgress variant="determinate" value={course.progress} />
                </Link>
                <CardActions className='flex justify-between'>
                  <Button
                    color='error'
                    style={{ margin: '5px' }}
                    variant='contained'
                    size='small'
                    onClick={() => dispatch(removeCourseFromCompleted(course.id))}
                  >
                    Remove from Completed
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    <FavoriteBorderIcon color='primary' /> {course.likes}
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </div>

      </div>
    </div>

  );
};

export default StudentDashboard;
