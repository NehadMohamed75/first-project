import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../../configs/constants";
import axiosHttp from "../../utils/axios_client";
import AnnouncementState from "../../interfaces/state/AnnouncementState";
import Announcement from "../../interfaces/Announcement";
import ApiError from "../../interfaces/ApiError";
import UpdateAnnouncementPayload from "../../interfaces/payload/UpdateAnnouncementPayload";
// import CreateAnnouncementPayload from "../../interfaces/payload/CreateAnnouncementPayload";

const initialState: AnnouncementState = {
    announcements: [],
    status_code: null,
    error: null,
    currentAnnouncement: null,
    loading: false
}

export const getAllAnnouncements = createAsyncThunk('announcements/all', async () => {
    try {
      const response = await axiosHttp.get(`${baseUrl}/announcements`);
      return {
        status_code: response.status,
        announcements: response.data as Announcement[],
      } as AnnouncementState;
    } catch (error) {
      throw ApiError.from(error);
    }
});

export const createAnnouncement = createAsyncThunk('announcements/create', async (data: FormData) => {
    try {
      const response = await axiosHttp.post(`${baseUrl}/announcements`, data);
      return {
        status_code: response.status,
        announcement: response.data as Announcement,
      };
    } catch (error) {
        throw ApiError.from(error);
    }
});

export const updateAnnouncement = createAsyncThunk('announcements/update', async (payload: UpdateAnnouncementPayload) => {
    try {
      const response = await axiosHttp.put(`${baseUrl}/announcements/${payload.id}`, payload.data);
      return {
        status_code: response.status,
        announcement: response.data as Announcement,
      };
    } catch (error) {
        throw ApiError.from(error);
    }
});

export const deleteAnnouncement = createAsyncThunk('announcement/delete', async (id: string) => {
    try {
      const response = await axiosHttp.delete(`${baseUrl}/announcements/${id}`);
      return {
        status_code: response.status,
        announcement_id: id,
      };
    } catch (error) {
        throw ApiError.from(error);
    }
  });

const AnnouncementSlice = createSlice({
    name: 'Announcement',
    initialState,
    reducers: {
        setCurrentAnnouncement(state,action){
            state.currentAnnouncement = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAnnouncements.fulfilled, (state, action: PayloadAction<AnnouncementState>) => {
            state.loading = false
            state.error = null
            state.announcements = action.payload.announcements
        })
        builder.addCase(getAllAnnouncements.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(getAllAnnouncements.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createAnnouncement.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.announcements.push(action.payload.announcement)
        })
        builder.addCase(createAnnouncement.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(createAnnouncement.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            const payloadAnnouncement = action.payload.announcement as Announcement
            state.announcements = state.announcements.filter(announcemetn => announcemetn._id != payloadAnnouncement._id)
            state.announcements.push(payloadAnnouncement)
        })
        builder.addCase(updateAnnouncement.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(updateAnnouncement.pending, (state) => {
            state.loading = true
        })


        builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.announcements = state.announcements.filter(teacher => teacher._id != action.payload.announcement_id)
        })
        builder.addCase(deleteAnnouncement.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(deleteAnnouncement.pending, (state) => {
            state.loading = true
        })
    }
})

export default AnnouncementSlice.reducer
export const {setCurrentAnnouncement} = AnnouncementSlice.actions