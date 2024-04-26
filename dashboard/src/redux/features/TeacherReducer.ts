import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../configs/constants";
import axiosHttp from "../../utils/axios_client";
import ApiError from "../../interfaces/ApiError";
import TeacherState from "../../interfaces/state/TeacherState";
import Teacher from "../../interfaces/Teacher";
import UpdateTeacherPayload from "../../interfaces/payload/UpdateTeacherPayload";
import UpdateStudentDegreePayload from "../../interfaces/payload/UpdateStudentDegreePayload";

const initialState: TeacherState = {
    teachers: [],
    status_code: null,
    error: null,
    currentTeacher: null,
    loading: false,
    currentControlledStudent: null
}

export const getAllTeachers = createAsyncThunk('teachers/all', async () => {
    try {
      const response = await axiosHttp.get(`${baseUrl}/teachers`);
      return {
        status_code: response.status,
        teachers: response.data as Teacher[],
      } as TeacherState;
    } catch (error) {
      throw ApiError.from(error);
    }
});

export const createTeacher = createAsyncThunk('teachers/create', async (data: FormData) => {
  try {
    const response = await axiosHttp.post(`${baseUrl}/teachers`, data);
    return {
      status_code: response.status,
      teacher: response.data as Teacher,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const updateTeacher = createAsyncThunk('teachers/update', async (payload: UpdateTeacherPayload) => {
  try {
    const response = await axiosHttp.put(`${baseUrl}/teachers/${payload.id}`, payload.data);
    return {
      status_code: response.status,
      teacher: response.data as Teacher,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const updateStudentDegree = createAsyncThunk('teachers/update-degree', async (payload: UpdateStudentDegreePayload) => {
  try {
    const response = await axiosHttp.put(`${baseUrl}/teachers/${payload.teacher_id}/students/${payload.student_id}/degrees/${payload.degree_id}`, payload.data);
    return {
      status_code: response.status
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const deleteTeacher = createAsyncThunk('teachers/delete', async (id: string) => {
  try {
    const response = await axiosHttp.delete(`${baseUrl}/teachers/${id}`);
    return {
      status_code: response.status,
      teacher_id: id,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

const TeacherSlice = createSlice({
    name: 'Teacher',
    initialState,
    reducers: {
      setCurrentTeacher(state,action){
        state.currentTeacher = action.payload
      },

      setCurrentControlledStudent(state,action){
        state.currentControlledStudent = action.payload
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTeachers.fulfilled, (state, action: PayloadAction<TeacherState>) => {
            state.loading = false
            state.error = null
            state.teachers = action.payload.teachers
        })
        builder.addCase(getAllTeachers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getAllTeachers.pending, (state) => {
            state.loading = true
        })


        builder.addCase(createTeacher.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.teachers.push(action.payload.teacher)
        })
        builder.addCase(createTeacher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(createTeacher.pending, (state) => {
            state.loading = true
        })


        builder.addCase(deleteTeacher.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.teachers = state.teachers.filter(teacher => teacher._id != action.payload.teacher_id)
        })
        builder.addCase(deleteTeacher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(deleteTeacher.pending, (state) => {
            state.loading = true
        })


        builder.addCase(updateTeacher.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            const payloadTeacher = action.payload.teacher as Teacher
            state.teachers = state.teachers.filter(teacher => teacher._id != payloadTeacher._id)
            state.teachers.push(payloadTeacher)
        })
        builder.addCase(updateTeacher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(updateTeacher.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateStudentDegree.fulfilled, (state) => {
            state.loading = false
            state.error = null
            // const payloadTeacher = action.payload.teacher as Teacher
            // state.teachers = state.teachers.filter(teacher => teacher._id != payloadTeacher._id)
            // state.teachers.push(payloadTeacher)
        })
        builder.addCase(updateStudentDegree.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(updateStudentDegree.pending, (state) => {
            state.loading = true
        })
    }
})

export default TeacherSlice.reducer;
export const {
  setCurrentTeacher,
  setCurrentControlledStudent
} = TeacherSlice.actions