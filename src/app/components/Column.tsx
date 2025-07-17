'use client'
import { motion } from "framer-motion";
import { CardProps, ColumnProps } from "@/types/boardType";
import ColumnDropIndicator from "./ColumnDropIndicator";
import { DragEvent, useEffect, useState } from "react";
import { fetchCardsByColumnId } from "@/lib/utils/dataHelper";
import Card from "./Card";
import CardDropIndicator from "./CardDropIndicator";

interface ColumnsProps {
    column: ColumnProps;
    handleDragStart: (e: DragEvent<HTMLDivElement>, dataLabel: string, data: ColumnProps) => void
}

export default function Column({ column, handleDragStart }: ColumnsProps) {
    const [cards, setCards] = useState<CardProps[]>([]);

    useEffect(() => {
        fetchDataByColumnId();
    }, []);

    const fetchDataByColumnId = async () => {
        const fetchData = await fetchCardsByColumnId(column.id);
        if (fetchData) {
            setCards(fetchData);
        }
    }


    return (
        <div className="flex">
            <ColumnDropIndicator beforeId={column.id} />
            <div>
                <motion.div
                    layout
                    layoutId={column.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "columnId", column)}
                    className=" min-w-[300px] p-4 rounded">
                    <h2 className={`${column.headingColor} font-semibold`}>{column.title}</h2>
                    <hr className="my-4 text-neutral-400/20" />
                </motion.div>
                <div>
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                    <CardDropIndicator beforeId={"-1"} column={column.id} />

                </div>
            </div>
        </div>
    );
}