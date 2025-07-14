import { highlightIndicator } from "../lib/utils/dragHelper"
import { ColumnProps } from "../types/boardType"
import Column from "./Column"
import ColumnDropIndicator from "./ColumnDropIndicator"
import { DragEvent } from "react"

export default function Board() {
    const columns: ColumnProps[] = [
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
    ]

    const handleDragStart = (e: DragEvent<HTMLDivElement>, dataLabel: string, data: ColumnProps) => {
        e.dataTransfer.setData(dataLabel, data.id);
        // if (dataLabel === "columnId") {
        //     setIsCardDisabled(true);
        // }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>, type: string) => {
        e.preventDefault();

        // if (isCardDisabled || type === "board") {
        highlightIndicator(e, "board", type);
        // setActive(true);
        // }
    }


    return (
        <div>
            <div
                onDragOver={(e) => handleDragOver(e, "board")}
                className="flex gap-4 m-10">
                {columns.map((column) => (
                    <Column key={column.id} column={column} handleDragStart={handleDragStart} />
                ))}
                <ColumnDropIndicator beforeId={"-1"} />
            </div>

        </div>
    )
}