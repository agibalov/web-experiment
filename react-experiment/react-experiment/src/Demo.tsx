import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface DemoProps {
    explanation: string
    children: ReactNode
}

export default function Demo(props: DemoProps) {
    return (
        <>
            <Typography>{props.explanation}</Typography>
            {props.children}
            <hr />
        </>
    )
}
