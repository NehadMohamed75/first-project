import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import StudentState from "../../interfaces/state/StudentState";
import { baseUrl } from "../../configs/constants";
import Student from "../../interfaces/Student";
import axiosHttp from "../../utils/axios_client";
import ApiError from "../../interfaces/ApiError";
import UpdateStudentPayload from "../../interfaces/payload/UpdateStudentPayload";

const initialState: StudentState = {
    students: [],
    status_code: null,
    error: null,
    currentStudent: null,
    loading: false
}

export const getAllStudents = createAsyncThunk('students/all', async () => {
    try {
      const response = await axiosHttp.get(`${baseUrl}/students`);
      return {
        status_code: response.status,
        students: response.data as Student[],
      } as StudentState;
    } catch (error) {
      throw ApiError.from(error);
    }
});

export const createStudent = createAsyncThunk('students/create', async (data: FormData) => {
  try {
    const response = await axiosHttp.post(`${baseUrl}/students`, data);
    return {
      status_code: response.status,
      student: response.data as Student,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const updateStudent = createAsyncThunk('students/update', async (payload: UpdateStudentPayload) => {
  try {
    const response = await axiosHttp.put(`${baseUrl}/students/${payload.id}`, payload.data);
    return {
      status_code: response.status,
      student: response.data as Student,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const deleteStudent = createAsyncThunk('students/delete', async (id: string) => {
  try {
    const response = await axiosHttp.delete(`${baseUrl}/students/${id}`);
    return {
      status_code: response.status,
      student_id: id,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

const StudentSlice = createSlice({
    name: 'Student',
    initialState,
    reducers: {
      setCurrentStudent(state,action){
        state.currentStudent = action.payload
      },

      updateCurrentStudent(state,action){
        const payloadStudent = action.payload as Student
        state.students = state.students.filter(student => student._id != payloadStudent._id)
        state.students.push(payloadStudent)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStudents.fulfilled, (state, action: PayloadAction<StudentState>) => {
            state.loading = false
            state.error = null
            state.students = action.payload.students
        })
        builder.addCase(getAllStudents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getAllStudents.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createStudent.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.students.push(action.payload.student)
      })
      builder.addCase(createStudent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(createStudent.pending, (state) => {
          state.loading = true
      })


      builder.addCase(deleteStudent.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.students = state.students.filter(student => student._id != action.payload.student_id)
      })
      builder.addCase(deleteStudent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(deleteStudent.pending, (state) => {
          state.loading = true
      })


      builder.addCase(updateStudent.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          const payloadStudent = action.payload.student as Student
          state.students = state.students.filter(student => student._id != payloadStudent._id)
          state.students.push(payloadStudent)
      })
      builder.addCase(updateStudent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(updateStudent.pending, (state) => {
          state.loading = true
      })
    }
})

export default StudentSlice.reducer;
export const {
  updateCurrentStudent,
  setCurrentStudent
} = StudentSlice.actions