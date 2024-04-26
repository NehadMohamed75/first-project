import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../configs/constants";
import axiosHttp from "../../utils/axios_client";
import ApiError from "../../interfaces/ApiError";
import StudyTableState from "../../interfaces/state/StudyTableState";
import StudyTable from "../../interfaces/StudyTable";
import UpdateStudyTablePayload from "../../interfaces/payload/UpdateStudyTablePayload";

const initialState: StudyTableState = {
    tables: [],
    status_code: null,
    error: null,
    currentTable: null,
    loading: false
}

export const getAllStudyTables = createAsyncThunk('tables/all', async () => {
    try {
      const response = await axiosHttp.get(`${baseUrl}/tables`);
      return {
        status_code: response.status,
        tables: response.data as StudyTable[],
      } as StudyTableState;
    } catch (error) {
      throw ApiError.from(error);
    }
});

export const createStudyTable = createAsyncThunk('tables/create', async (data: FormData) => {
  try {
    const response = await axiosHttp.post(`${baseUrl}/tables`, data);
    return {
      status_code: response.status,
      table: response.data as StudyTable,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const updateStudyTable = createAsyncThunk('tables/update', async (payload: UpdateStudyTablePayload) => {
  try {
    const response = await axiosHttp.put(`${baseUrl}/tables/${payload.id}`, payload.data);
    return {
      status_code: response.status,
      table: response.data as StudyTable,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const deleteStudyTable = createAsyncThunk('tables/delete', async (id: string) => {
  try {
    const response = await axiosHttp.delete(`${baseUrl}/tables/${id}`);
    return {
      status_code: response.status,
      table_id: id,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

const StudyTableSlice = createSlice({
    name: 'StudyTables',
    initialState,
    reducers: {
      setCurrentStudyTable(state,action){
        state.currentTable = action.payload
      },

      updateCurrentStudyTable(state,action){
        const payloadStudyTable = action.payload as StudyTable
        state.tables = state.tables.filter(table => table._id != payloadStudyTable._id)
        state.tables.push(payloadStudyTable)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStudyTables.fulfilled, (state, action: PayloadAction<StudyTableState>) => {
            state.loading = false
            state.error = null
            state.tables = action.payload.tables
        })
        builder.addCase(getAllStudyTables.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getAllStudyTables.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createStudyTable.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.tables.push(action.payload.table)
      })
      builder.addCase(createStudyTable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(createStudyTable.pending, (state) => {
          state.loading = true
      })


      builder.addCase(deleteStudyTable.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.tables = state.tables.filter(table => table._id != action.payload.table_id)
      })
      builder.addCase(deleteStudyTable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(deleteStudyTable.pending, (state) => {
          state.loading = true
      })


      builder.addCase(updateStudyTable.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          const payloadStudyTable = action.payload.table as StudyTable
          state.tables = state.tables.filter(table => table._id != payloadStudyTable._id)
          state.tables.push(payloadStudyTable)
      })
      builder.addCase(updateStudyTable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(updateStudyTable.pending, (state) => {
          state.loading = true
      })
    }
})

export default StudyTableSlice.reducer;
export const {
  updateCurrentStudyTable,
  setCurrentStudyTable
} = StudyTableSlice.actions