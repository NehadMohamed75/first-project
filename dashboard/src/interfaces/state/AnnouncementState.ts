import Announcement from "../Announcement";
import ApiInterface from "../ApiInterface";

interface AnnouncementState extends ApiInterface{
    announcements: Array<Announcement>,
    currentAnnouncement: Announcement | null
}

export default AnnouncementState