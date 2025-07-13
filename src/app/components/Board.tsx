import { ColumnProps } from "../types/boardType"
import Column from "./Column"

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


    return (
        <div>
            <div className="flex gap-4 m-10">
                {columns.map((column) => (
                    <Column key={column.id} column={column} />
                ))}
            </div>
        </div>
    )
}