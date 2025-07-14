import { clearHighlights, getIndicators, getNearestIndicator, highlightIndicator } from "../lib/utils/dragHelper"
import { ColumnProps } from "../types/boardType"
import Column from "./Column"
import ColumnDropIndicator from "./ColumnDropIndicator"
import { DragEvent, useState } from "react"

export default function Board() {
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

    const handleDragEnd = (e: DragEvent<HTMLDivElement>, type: string) => {
        e.preventDefault();
        // setActive(false);
        clearHighlights("board", type);

        const columnId = e.dataTransfer.getData("columnId");
        const indicators = getIndicators("board", "board");
        const { element } = getNearestIndicator(e, indicators as HTMLDivElement[]);

        const before = element.dataset.before || "-1";

        if (before !== columnId) {
            let copy = [...columns];

            let columnToTransfer = copy.find((c) => c.id === columnId);
            if (!columnToTransfer) return;
            columnToTransfer = { ...columnToTransfer };

            copy = copy.filter((c) => c.id !== columnId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(columnToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, columnToTransfer);
            }

            setColumns(copy);
        }
    }


    return (
        <div>
            <div
                onDragOver={(e) => handleDragOver(e, "board")}
                onDrop={(e) => handleDragEnd(e, "board")}
                className="flex gap-4 m-10">
                {columns.map((column) => (
                    <Column key={column.id} column={column} handleDragStart={handleDragStart} />
                ))}
                <ColumnDropIndicator beforeId={"-1"} />
            </div>

        </div>
    )
}