import ApiInterface from "../ApiInterface";
import Staff from "../Staff";

interface StaffState extends ApiInterface{
    staffs: Array<Staff>,
    currentStaff: Staff | null
}

export default StaffState