import { handleDragEnd, handleDragOver, handleDragStart } from "@/lib/utils/dragHelper"
import { CardProps, ColumnProps } from "@/types/boardType"
import Column from "./Column"
import ColumnDropIndicator from "./ColumnDropIndicator"
import { DragEvent, useEffect, useState } from "react"
import { addColumn, fetchCards, fetchColumns, updateColumnOrder } from "@/lib/utils/dataHelper"
import LoadingSpinner from "./LoadingSpinner"

export default function Board() {
    const DROP_INDICATOR_LABEL = "board";
    const [columns, setColumns] = useState<ColumnProps[]>([]);
    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // ← Add loading state

    useEffect(() => {
        fetchData(true);
    }, []);

    const fetchData = async (needLoading: boolean = false) => {
        setLoading(needLoading);

        const fetchedColumns = await fetchColumns();
        if (fetchedColumns) {
            setColumns(fetchedColumns);
        }

        const fetchedCards = await fetchCards();
        if (fetchedCards) {
            setCards(fetchedCards);
        }
        setLoading(false); // ← Stop loading
    }

    const handleAddColumn = async () => {
        await addColumn(`Column ${columns.length + 1}`, "text-blue-600");
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
        <div className="flex gap-4 m-20"
        onDragOver={(e) => handleDragOver(e, DROP_INDICATOR_LABEL)}
        onDrop={handleColumnDragEnd}
        >
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <LoadingSpinner />
                </div>
            ) : (
                <div
                    className="flex"
                >
                    {columns.map((column) => (
                        <Column key={column.id} column={column} fetchData={fetchData} cards={cards} setCards={setCards} />
                    ))}
                    <ColumnDropIndicator beforeId={"-1"} />
                    <div className="mt-4">
                        <h2 onClick={handleAddColumn} className="flex items-center p-2 text-xs text-nowrap text-gray-400 mx-5 cursor-pointer hover:text-violet-400">Add Column</h2>
                    </div>
                </div>
            )}
        </div>
    );
}
