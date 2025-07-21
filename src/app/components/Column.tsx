'use client'
import { motion } from "framer-motion";
import { CardProps, ColumnProps } from "@/types/boardType";
import ColumnDropIndicator from "./ColumnDropIndicator";
import { DragEvent, useEffect, useState } from "react";
import { fetchCards, fetchCardsByColumnId, updateCardOrder } from "@/lib/utils/dataHelper";
import Card from "./Card";
import CardDropIndicator from "./CardDropIndicator";
import AddCard from "./AddCard";
import LoadingCard from "./LoadingCard";
import { handleCardDragEnd, handleDragLeave, handleDragOver } from "@/lib/utils/dragHelper";

interface ColumnsProps {
    column: ColumnProps;
    handleDragStart: (e: DragEvent<HTMLDivElement>, dataLabel: string, data: ColumnProps) => void;
    fetchData(): Promise<void>;
}

export default function Column({ column, handleDragStart, fetchData }: ColumnsProps) {
    const CARD_DROP_INDICATOR_LABEL = "card";

    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDataByColumnId();
    }, []);

    const fetchDataByColumnId = async () => {
        setLoading(true);
        const fetchData = await fetchCardsByColumnId(column.id);
        if (fetchData) {
            setCards(fetchData);
        }
        setLoading(false);
    };

    const handleDragEnd = async (e: DragEvent<HTMLDivElement>) => {
        // const fetchCardsData = await fetchCards();
        const updateCards = await handleCardDragEnd(e, CARD_DROP_INDICATOR_LABEL, column.id , cards) as CardProps[];

        if (updateCards) {
            updateCardOrder(updateCards);
            fetchData();
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
                    // onDragStart={(e) => handleDragStart(e, "columnId", column)}
                    className="min-w-[300px] p-4 rounded"
                >
                    <h2 className={column?.headingColor}>{column.title}</h2>
                    <hr className="my-4 text-neutral-400/20" />
                </motion.div>
                <div>
                    {loading ? (
                        Array.from({ length: Math.floor(Math.random() * 4) + 3 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))
                    ) : (
                        <div
                            onDragOver={(e) => handleDragOver(e, CARD_DROP_INDICATOR_LABEL, column.id)}
                            onDragLeave={() => handleDragLeave(CARD_DROP_INDICATOR_LABEL, column.id)}
                            onDrop={(e) => handleDragEnd(e)}>
                            {cards.map((card) => (
                                <Card key={card.id} card={card} />
                            ))}
                            <CardDropIndicator beforeId={"-1"} column={column.id} />
                            <AddCard columnId={column.id} onCardAdded={fetchDataByColumnId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
