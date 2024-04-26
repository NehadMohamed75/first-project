import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './features/AuthReducer';
import StudentReducer from './features/StudentReducer';
import AnnouncementReducer from './features/AnnouncementReducer';
import TeacherReducer from './features/TeacherReducer';
import CourseReducer from './features/CourseReducer';
import StudyTableReducer from './features/StudyTableReducer';
import StaffReducer from './features/StaffReducer';
import StatisticsReducer from './features/StatisticsReducer';



const rootReducer = combineReducers({
    auth_provider: AuthReducer,
    student_provider: StudentReducer,
    announcement_provider: AnnouncementReducer,
    teacher_provider: TeacherReducer,
    course_provider: CourseReducer,
    study_table_provider: StudyTableReducer,
    staff_provider: StaffReducer,
    statistics_provider: StatisticsReducer
});

export default rootReducer;
