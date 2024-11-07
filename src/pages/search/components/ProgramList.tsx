import React, { useState } from "react";
import Typography from "@mui/material/Typography/Typography";
import { program } from "../../../services/modules/programs/programs.slice";


interface IProgramList {
    program: program | null;
}

const DesktopList: React.FC<{ value: string }> = ({ value }) => (
    <div className={`w-[300px] p-5`}>
        <Typography sx={{ wordBreak: "break-word" }} className="mb-1" variant="body1">{value}</Typography>
    </div>
);

const ProgramList: React.FC<IProgramList> = ({ program }) => {

    const [textWhite, setTextWhite] = useState(false);

    return program ? (
        <li
            onMouseOver={() => {
                setTextWhite(true);
            }}
            onMouseOut={() => {
                setTextWhite(false);
            }}
            className="md:min-h-[100px] md:hover:scale-105 md:hover:bg-[#303BB7] md:hover:text-[white] transition-all last:mb-0 mb-4 border-[1px] border-[solid] border-[#E7E7E7] rounded-[15px] p-5 md:p-0 flex justify-center items-center"
        >
            <a className="md:hidden w-full flex justify-center items-center" href={program.programLink} target="_blank">
                <div className="flex-[3]">
                    <Typography className="mb-1" variant="body1">{program.programName}</Typography>
                    <Typography variant="caption">{program.schoolName}</Typography>
                </div>

                <div className="flex-[1] flex items-center justify-end">
                    <Typography className={!textWhite ? `text-[#0D47A1]` : 'text-white'} variant="body1">{program.entranceGrade}</Typography>
                </div>
            </a>
            <a className="hidden w-full md:flex justify-between items-center" href={program.programLink} target="_blank">
                <DesktopList value={program.programName} />
                <DesktopList value={program.schoolName} />
                <DesktopList value={program.length} />
                <DesktopList value={program.tutionValue} />
                <DesktopList value={program.entranceGrade} />
            </a>
        </li>
    ) : <></>;
}

export default ProgramList;