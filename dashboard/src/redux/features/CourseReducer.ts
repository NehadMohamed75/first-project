import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../configs/constants";
import axiosHttp from "../../utils/axios_client";
import ApiError from "../../interfaces/ApiError";
import CourseState from "../../interfaces/state/CourseState";
import Course from "../../interfaces/Course";
import UpdateCoursePayload from "../../interfaces/payload/UpdateCoursePayload";
import CreateCoursePayload from "../../interfaces/payload/CreateCoursePayload";

const initialState: CourseState = {
    courses: [],
    status_code: null,
    error: null,
    currentCourse: null,
    loading: false
}

export const getAllCourses = createAsyncThunk('courses/all', async () => {
    try {
      const response = await axiosHttp.get(`${baseUrl}/courses`);
      return {
        status_code: response.status,
        courses: response.data as Course[],
      } as CourseState;
    } catch (error) {
      throw ApiError.from(error);
    }
});

export const createCourse = createAsyncThunk('courses/create', async (data: CreateCoursePayload) => {
  try {
    const response = await axiosHttp.post(`${baseUrl}/courses`, data);
    return {
      status_code: response.status,
      course: response.data as Course,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const updateCourse = createAsyncThunk('courses/update', async (payload: UpdateCoursePayload) => {
  try {
    const response = await axiosHttp.put(`${baseUrl}/courses/${payload.id}`, payload.data);
    return {
      status_code: response.status,
      course: response.data as Course,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const deleteCourse = createAsyncThunk('courses/delete', async (id: string) => {
  try {
    const response = await axiosHttp.delete(`${baseUrl}/courses/${id}`);
    return {
      status_code: response.status,
      student_id: id,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

const CourseSlice = createSlice({
    name: 'Course',
    initialState,
    reducers: {
      setCurrentCourse(state,action){
        state.currentCourse = action.payload
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action: PayloadAction<CourseState>) => {
            state.loading = false
            state.error = null
            state.courses = action.payload.courses
        })
        builder.addCase(getAllCourses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getAllCourses.pending, (state) => {
            state.loading = true
        })


        builder.addCase(createCourse.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.courses.push(action.payload.course)
        })
        builder.addCase(createCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(createCourse.pending, (state) => {
            state.loading = true
        })


        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.courses = state.courses.filter(teacher => teacher._id != action.payload.student_id)
        })
        builder.addCase(deleteCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(deleteCourse.pending, (state) => {
            state.loading = true
        })


        builder.addCase(updateCourse.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            const payloadTeacher = action.payload.course as Course
            state.courses = state.courses.filter(teacher => teacher._id != payloadTeacher._id)
            state.courses.push(payloadTeacher)
        })
        builder.addCase(updateCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(updateCourse.pending, (state) => {
            state.loading = true
        })
    }
})

export default CourseSlice.reducer;
export const {
  setCurrentCourse
} = CourseSlice.actions