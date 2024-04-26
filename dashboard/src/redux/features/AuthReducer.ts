import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AuthState from "../../interfaces/state/AuthState";
import TeacherLoginPayload from "../../interfaces/payload/TeacherLoginPayload";
import { baseUrl } from "../../configs/constants";
import axiosHttp from "../../utils/axios_client";
import ApiError from "../../interfaces/ApiError";
import StudentLoginPayload from "../../interfaces/payload/StudentLoginPayload";
import StaffLoginPayload from "../../interfaces/payload/StaffLoginPayload";
import Staff from "../../interfaces/Staff";
import Student from "../../interfaces/Student";
import Teacher from "../../interfaces/Teacher";

const initialState: AuthState = {
    token: null,
    role: null,
    loading: false,
    status_code: null,
    currentUserData: null,
    error: null
}

interface ResponseData {
    token: string,
    role: 'staff' | 'student' | 'teacher'
    id: string,
    user: Teacher | Student | Staff
}

export const loginTeacher = createAsyncThunk('teachers/login', async (data: TeacherLoginPayload) => {
    try {
      const response = await axiosHttp.post(`${baseUrl}/auth/teacher`, data)
      const responseData: ResponseData = response.data as ResponseData      

      return {
        status_code: response.status,
        token: responseData.token,
        id: responseData.id,
        role: responseData.role,
        user: responseData.user
      };
    } catch (error) {
        console.log(error.message);
        
        throw ApiError.from(error);
    }
});

export const loginStudent = createAsyncThunk('students/login', async (data: StudentLoginPayload) => {
    try {
      const response = await axiosHttp.post(`${baseUrl}/auth/student`, data)
      const responseData: ResponseData = response.data as ResponseData      

      return {
        status_code: response.status,
        token: responseData.token,
        id: responseData.id,
        role: responseData.role,
        user: responseData.user
      };
    } catch (error) {
        console.log(error.message);
        
        throw ApiError.from(error);
    }
});

export const loginStaff = createAsyncThunk('staffs/login', async (data: StaffLoginPayload) => {
    try {
      const response = await axiosHttp.post(`${baseUrl}/auth/staff`, data)
      const responseData: ResponseData = response.data as ResponseData      

      return {
        status_code: response.status,
        token: responseData.token,
        id: responseData.id,
        role: responseData.role,
        user: responseData.user
      };
    } catch (error) {
        console.log(error.message);
        
        throw ApiError.from(error);
    }
});

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logout(state){
            state.error = null
            state.role = null
            state.token = null
            state.status_code = null
            state.currentUserData = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTeacher.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.token = action.payload.token
            state.status_code = action.payload.status_code
            state.role = action.payload.role
            state.currentUserData = action.payload.user
        })
        builder.addCase(loginTeacher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(loginTeacher.pending, (state) => {
            state.loading = true
        })

        builder.addCase(loginStudent.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.token = action.payload.token
            state.status_code = action.payload.status_code
            state.role = action.payload.role
            state.currentUserData = action.payload.user
        })
        builder.addCase(loginStudent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(loginStudent.pending, (state) => {
            state.loading = true
        })

        builder.addCase(loginStaff.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.token = action.payload.token
            state.status_code = action.payload.status_code
            state.role = action.payload.role
            state.currentUserData = action.payload.user
        })
        builder.addCase(loginStaff.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(loginStaff.pending, (state) => {
            state.loading = true
        })
    }
})

export default AuthSlice.reducer;
export const {logout} = AuthSlice.actions