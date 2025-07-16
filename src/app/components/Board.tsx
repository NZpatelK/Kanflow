import { handleDragEnd, handleDragOver, handleDragStart } from "@/lib/utils/dragHelper"
import { ColumnProps } from "@/types/boardType"
import Column from "./Column"
import ColumnDropIndicator from "./ColumnDropIndicator"
import { DragEvent, useEffect, useState } from "react"
import { addColumn, fetchColumns, updateColumnOrder } from "@/lib/utils/dataHelper"

export default function Board() {
    const DROP_INDICATOR_LABEL = "board";
    const [columns, setColumns] = useState<ColumnProps[]>([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
           const fetchedColumns = await fetchColumns();
            if (fetchedColumns) {
                setColumns(fetchedColumns);
            }
    }

    const handleAddColumn = async () => {
        await addColumn( `Column ${columns.length + 1}` , "text-neutral-600");
        fetchData();
    } 

    const handleColumnDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const updateColumns = handleDragEnd(e, DROP_INDICATOR_LABEL, columns) as ColumnProps[];
        if (updateColumns) {
            setColumns(updateColumns);
            updateColumnOrder(updateColumns);
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
                <div className="flex items-center mb-10 text-neutral-600 hover:text-neutral-200 transition-all">
                    <h2 onClick={handleAddColumn} className="font-semibold text-sm text-nowrap">Add Column</h2>
                </div>
            </div>

        </div>
    )
}