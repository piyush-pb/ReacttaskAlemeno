import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse, removeEnrollment } from '../redux/actions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(0);
  const allCourses = useSelector((state) => state.allCourses);
  const enrolledCourses = useSelector((state) => state.enrolledCourses);

  useEffect(() => {
    setCourses(allCourses);
  }, [allCourses]);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`http://localhost:5000/allLikes`, {
        method: 'GET'
      });
      const result = await res.json();
      console.log(result);
      setLikes(result.likes);
    }
    fetchLikes();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filteredCourses = allCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term)
    );
    setCourses(filteredCourses);
    setSearchTerm(term);
  };

  const isCourseEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course.id === courseId);
  };

  const handleEnrollToggle = (course) => {
    if (isCourseEnrolled(course.id)) {
      dispatch(removeEnrollment(course.id));
    } else {
      dispatch(enrollCourse(course));
    }
  };

  return (
    <div>
      <h1 className='m-[20px] text-3xl uppercase font-semibold'>Course Listing Page</h1>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, m: '20px' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by course name or instructor"
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className='flex flex-wrap justify-start'>
        {courses.map((course) => (
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
                  Status: {course.enrollmentStatus}
                </Typography>
              </CardContent>
            </Link>
            <CardActions className='flex justify-between'>
              <Button color={isCourseEnrolled(course.id) ? 'error' : 'primary'} variant="contained" size="small" style={{margin:"5px"}} onClick={() => handleEnrollToggle(course)}>
                {isCourseEnrolled(course.id) ? 'Unenroll' : 'Enroll'}
              </Button>
              <Typography variant="body2" color="text.secondary">
                <FavoriteBorderIcon color='primary' /> {likes[course.id]}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
