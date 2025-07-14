import { ColumnProps } from "../types/boardType"
import Column from "./Column"
import ColumnDropIndicator from "./ColumnDropIndicator"

export default function Board() {
    const columns: ColumnProps[] = [
        {
            id: "1",
            title: "Backlog",
            headingColor: "text-gray-600",
            label: "backlog"
        },
        {
            id: "2",
            title: "To Do",
            headingColor: "text-yellow-200",
            label: "todo"

        },
        {
            id: "3",
            title: "In Progress",
            headingColor: "text-blue-300",
            label: "inprogress"
        },
        {
            id: "4",
            title: "Done",
            headingColor: "text-green-200",
            label: "done"
        },
    ]


    return (
        <div>
            <div className="flex gap-4 m-10">
                {columns.map((column) => (
                    <Column key={column.id} column={column} />
                ))}
            </div>
            <ColumnDropIndicator beforeId={"-1"} column={columns[columns.length - 1].label} />

        </div>
    )
}