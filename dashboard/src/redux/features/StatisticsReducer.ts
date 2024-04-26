import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatisticsState from "../../interfaces/state/StatisticsState";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

interface StaffStatisticsResponse{
    staffs_count: number
    courses_count: number
    students_count: number
    announcements_count: number
    teachers_count: number
    tables_count: number
}

const initialState: StatisticsState = {
    statistics: {
        teachers_count: 0,
        staffs_count: 0,
        students_count: 0,
        announcements_count: 0,
        courses_count: 0,
        tables_count: 0
    },
    loading: false,
    status_code: null,
    error: null
}

export const getStaffDashboardStatistics = createAsyncThunk('dashboard/statistics', async () => {
    try{
        const response = await axiosHttp.get('/statistics/staff')
        return response.data as StaffStatisticsResponse
    }catch(error){
        throw ApiError.from(error)
    }
})

const StatisticsSlice = createSlice({
    name: 'Statistics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStaffDashboardStatistics.fulfilled, (state, action: PayloadAction<StaffStatisticsResponse>) => {
            state.loading = false
            state.error = null
            state.statistics = action.payload
        })
        builder.addCase(getStaffDashboardStatistics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getStaffDashboardStatistics.pending, (state) => {
            state.loading = true
        })
    }
})

export default StatisticsSlice.reducer