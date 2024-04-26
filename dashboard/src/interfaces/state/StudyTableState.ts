import ApiInterface from "../ApiInterface";
import StudyTable from "../StudyTable";

interface StudyTableState extends ApiInterface{
    tables: Array<StudyTable>,
    currentTable: StudyTable | null
}

export default StudyTableState