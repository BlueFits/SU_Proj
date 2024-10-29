import React from "react";
import Typography from "@mui/material/Typography/Typography";
import { program } from "../../../services/modules/programs/programs.slice";

interface IProgramList {
    program: program
}

const ProgramList: React.FC<IProgramList> = ({ program }) => {
    return (
        <li className="last:mb-0 mb-4 border-[1px] border-[solid] border-[#E7E7E7] rounded-[15px] p-5 flex justify-center items-center">
        <div className="flex-[3]">
            <Typography className="mb-1" variant="body1">{program.programName}</Typography>
            <Typography variant="caption">{program.schoolName}</Typography>
        </div>

        <div className="flex-[1] flex items-center justify-end">
            <Typography className="text-[#0D47A1]" variant="body1">{program.entranceGrade}</Typography>
        </div>
    </li>
    );
}

export default ProgramList;