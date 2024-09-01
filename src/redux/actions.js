export const enrollCourse = (course) => ({
  type: 'ENROLL_COURSE',
  payload: course,
});

export const removeEnrollment = (courseId) => ({
  type: 'REMOVE_ENROLLMENT',
  payload: courseId,
});

export const markCourseAsCompleted = (courseId) => ({
  type: 'MARK_COURSE_AS_COMPLETED',
  payload: courseId,
});

export const removeCourseFromCompleted = (courseId) => ({
  type: 'REMOVE_COURSE_FROM_COMPLETED',
  payload: courseId,
});