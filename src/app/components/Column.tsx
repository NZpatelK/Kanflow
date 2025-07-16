'use client'
import { motion } from "framer-motion";
import { ColumnProps } from "@/types/boardType";
import ColumnDropIndicator from "./ColumnDropIndicator";
import { DragEvent } from "react";

interface ColumnsProps {
    column: ColumnProps;
    handleDragStart: (e: DragEvent<HTMLDivElement>, dataLabel: string, data: ColumnProps) => void

}

export default function Column({ column , handleDragStart }:  ColumnsProps) {
    return (
        <>
        <ColumnDropIndicator beforeId={column.id}/>     
            <motion.div
                layout
                layoutId={column.id}
                draggable
                onDragStart={(e) => handleDragStart(e, "columnId", column)}
                className="w-80 bg-neutral-500/0 p-4 rounded">
                <h2 className={`${column.headingColor} font-semibold`}>{column.title}</h2>
                <hr className="my-4 text-neutral-400/20" />
            </motion.div>
        </>
    );
}