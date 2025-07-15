import {handleDragEnd, handleDragOver, handleDragStart } from "../lib/utils/dragHelper"
import { ColumnProps } from "../types/boardType"
import Column from "./Column"
import ColumnDropIndicator from "./ColumnDropIndicator"
import { DragEvent, useState } from "react"

export default function Board() {
    const DROP_INDICATOR_LABEL = "board";
    const [columns, setColumns] = useState<ColumnProps[]>([
        {
            id: "1",
            title: "Backlog",
            headingColor: "text-gray-600",
        },
        {
            id: "2",
            title: "To Do",
            headingColor: "text-yellow-200",

        },
        {
            id: "3",
            title: "In Progress",
            headingColor: "text-blue-300",
        },
        {
            id: "4",
            title: "Done",
            headingColor: "text-green-200",
        },
    ])

    const handleColumnDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const updateColumns = handleDragEnd(e, DROP_INDICATOR_LABEL, columns) as ColumnProps[];
        if(updateColumns) {
            setColumns(updateColumns);
        }
    }

    return (
        <div>
            <div
                onDragOver={(e) => handleDragOver(e, DROP_INDICATOR_LABEL)}
                onDrop={handleColumnDragEnd}
                className="flex gap-4 m-10">
                {columns.map((column) => (
                    <Column key={column.id} column={column} handleDragStart={handleDragStart} />
                ))}
                <ColumnDropIndicator beforeId={"-1"} />
            </div>

        </div>
    )
}