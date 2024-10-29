import React from "react";
import Typography from "@mui/material/Typography/Typography";

const ProgramList = () => {
    return (
        <li className="last:mb-0 mb-4 border-[1px] border-[solid] border-[#E7E7E7] rounded-[15px] p-5 flex justify-center items-center">
        <div className="flex-[3]">
            <Typography className="mb-1" variant="body1">Geophysics (BSc with Specialization)</Typography>
            <Typography variant="caption">University of Alberta</Typography>
        </div>

        <div className="flex-[1] flex items-center justify-end">
            <Typography className="text-[#0D47A1]" variant="body1">80 - 82</Typography>
        </div>
    </li>
    );
}

export default ProgramList;