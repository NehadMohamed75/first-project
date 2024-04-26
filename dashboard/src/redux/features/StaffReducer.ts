import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../configs/constants";
import axiosHttp from "../../utils/axios_client";
import ApiError from "../../interfaces/ApiError";
import StaffState from "../../interfaces/state/StaffState";
import Staff from "../../interfaces/Staff";
import UpdateStaffPayload from "../../interfaces/payload/UpdateStaffPayload";

const initialState: StaffState = {
    staffs: [],
    status_code: null,
    error: null,
    currentStaff: null,
    loading: false
}

export const getAllStaffs = createAsyncThunk('staffs/all', async () => {
    try {
      const response = await axiosHttp.get(`${baseUrl}/staffs`);
      return {
        status_code: response.status,
        staffs: response.data as Staff[],
      } as StaffState;
    } catch (error) {
      throw ApiError.from(error);
    }
});

export const createStaff = createAsyncThunk('staffs/create', async (data: FormData) => {
  try {
    const response = await axiosHttp.post(`${baseUrl}/staffs`, data);
    return {
      status_code: response.status,
      staff: response.data as Staff,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const updateStaff = createAsyncThunk('staffs/update', async (payload: UpdateStaffPayload) => {
  try {
    const response = await axiosHttp.put(`${baseUrl}/staffs/${payload.id}`, payload.data);
    return {
      status_code: response.status,
      staff: response.data as Staff,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

export const deleteStaff = createAsyncThunk('staffs/delete', async (id: string) => {
  try {
    const response = await axiosHttp.delete(`${baseUrl}/staffs/${id}`);
    return {
      status_code: response.status,
      staff_id: id,
    };
  } catch (error) {
      throw ApiError.from(error);
  }
});

const StaffSlice = createSlice({
    name: 'Staff',
    initialState,
    reducers: {
      setCurrentStaff(state,action){
        state.currentStaff = action.payload
      },

      updateCurrentStaff(state,action){
        const payloadStaff = action.payload as Staff
        state.staffs = state.staffs.filter(staff => staff._id != payloadStaff._id)
        state.staffs.push(payloadStaff)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStaffs.fulfilled, (state, action: PayloadAction<StaffState>) => {
            state.loading = false
            state.error = null
            state.staffs = action.payload.staffs
        })
        builder.addCase(getAllStaffs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getAllStaffs.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createStaff.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.staffs.push(action.payload.staff)
      })
      builder.addCase(createStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(createStaff.pending, (state) => {
          state.loading = true
      })


      builder.addCase(deleteStaff.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.staffs = state.staffs.filter(staff => staff._id != action.payload.staff_id)
      })
      builder.addCase(deleteStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(deleteStaff.pending, (state) => {
          state.loading = true
      })


      builder.addCase(updateStaff.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          const payloadStaff = action.payload.staff as Staff
          state.staffs = state.staffs.filter(staff => staff._id != payloadStaff._id)
          state.staffs.push(payloadStaff)
      })
      builder.addCase(updateStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      builder.addCase(updateStaff.pending, (state) => {
          state.loading = true
      })
    }
})

export default StaffSlice.reducer;
export const {
  updateCurrentStaff,
  setCurrentStaff
} = StaffSlice.actions