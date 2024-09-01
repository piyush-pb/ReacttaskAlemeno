import courseModel from "../courseModel";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
  }
};

const initialState = {
  allCourses: courseModel,
  enrolledCourses: loadState()?.enrolledCourses || [],
  completedCourses: [],
};

const rootReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case 'ENROLL_COURSE':
      nextState = {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload],
      };
      break;
    case 'REMOVE_ENROLLMENT':
      nextState = {
        ...state,
        enrolledCourses: state.enrolledCourses.filter((course) => course.id !== action.payload),
      };
      break;
    case 'MARK_COURSE_AS_COMPLETED':
      const completedCourseId = action.payload;
      console.log('Completed Course ID:', completedCourseId);
      nextState = {
        ...state,
        enrolledCourses: state.enrolledCourses.map((course) =>
          course.id === completedCourseId ? { ...course, completed: true } : course
        ),
        completedCourses: [...state.completedCourses, completedCourseId],
      };
      console.log('Updated Completed Courses:', nextState.completedCourses);
      break;

    case 'REMOVE_COURSE_FROM_COMPLETED':
      const removedCompletedCourseId = action.payload;
      nextState = {
        ...state,
        completedCourses: state.completedCourses.filter((id) => id !== removedCompletedCourseId),
        enrolledCourses: state.enrolledCourses.map((course) =>
          course.id === removedCompletedCourseId ? { ...course, completed: false } : course
        ),
      };
      break;


    default:
      nextState = state;
  }

  saveState(nextState);
  return nextState;
};

export default rootReducer;