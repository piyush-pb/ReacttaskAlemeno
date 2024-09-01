import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse, removeEnrollment } from '../redux/actions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import LockResetIcon from '@mui/icons-material/LockReset';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, CardActionArea, CardActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.allCourses);
  const enrolledCourses = useSelector((state) => state.enrolledCourses);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`http://localhost:5000/likes?id=${id}`, {
        method: 'GET'
      });
      const result = await res.json();
      console.log(result);
      setLikes(result.likes);
    }
    fetchLikes();
  }, []);

  const course = allCourses.find((course) => course.id === parseInt(id, 10));

  if (!course) {
    return (
      <div>
        <h1>Course Not Found</h1>
        <Link to="/">Back to Course List</Link>
      </div>
    );
  }

  const isCourseEnrolled = enrolledCourses.some((enrolledCourse) => enrolledCourse.id === course.id);

  const handleEnroll = () => {
    dispatch(enrollCourse(course));
  };

  const handleUnenroll = () => {
    dispatch(removeEnrollment(course.id));
  };

  return (
    <div>
      <h1 className='m-[20px] text-3xl uppercase font-semibold'>Course Details Page</h1>
      <Link to="/" className='inline-block'><p className='ml-[20px] text-blue-600'><ArrowBackIcon/>&nbsp;Back to Course List</p></Link>
      <div className='flex flex-wrap justify-center'>
        <div className='m-2 lg:m-5'>
          <Card sx={{ width: "900px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail}
                alt="Course Thumbnail"
              />
              <CardContent>
                <div className='flex justify-between'>
                <Typography gutterBottom variant="h4" component="div">
                  <b>{course.name}</b>
                </Typography>
                <CardActions className='flex justify-between'>
                    {isCourseEnrolled ? (
                      <Button variant="contained" size="large" color='error' onClick={handleUnenroll}>Unenroll</Button>
                    ) : (
                      <Button variant="contained" size="large" color="primary" onClick={handleEnroll}>Enroll</Button>
                    )}
                  </CardActions>
                  </div>
                <Typography variant="body4" color="text.secondary">
                  <p className='py-1'>{course.description}</p>
                  <p className='py-1'><PersonIcon/>&nbsp;<b>Instructor : </b>{course.instructor}</p>
                  <p className='py-1'><LockResetIcon/>&nbsp;<b>Enrollment Status :</b> {course.enrollmentStatus}</p>
                  <p className='py-1'><AlarmOnIcon/>&nbsp;<b>Duration : </b>{course.duration}</p>
                  <p className='py-1'><CalendarMonthIcon/>&nbsp;<b>Schedule :</b> {course.schedule}</p>
                  <p className='py-1'><LocationOnIcon/>&nbsp;<b>Location : </b>{course.location}</p>
                  <p className='py-1'><BeenhereIcon/>&nbsp;<b>Prerequisites :</b> {course.prerequisites.join(', ')}</p>
                  <p className='py-1'><FavoriteBorderIcon/>&nbsp;<b>Likes :</b> {likes}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className='m-2 lg:m-5'>
          <Typography gutterBottom variant="h4" component="div">
            <b>SYLLABUS</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><p className='text-2xl font-medium'>Week</p></TableCell>
                  <TableCell><p className='text-2xl font-medium'>Topic</p></TableCell>
                  <TableCell><p className='text-2xl font-medium'>Content</p></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.syllabus.map((week) => (
                  <TableRow
                    key={week.week}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{week.week}</TableCell>
                    <TableCell component="th" scope="row">
                      {week.topic}
                    </TableCell>
                    <TableCell style={{display:"flex", flexWrap:"wrap"}}>{week.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
