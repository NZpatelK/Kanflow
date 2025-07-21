'use client'
import { motion } from "framer-motion";
import { CardProps, ColumnProps } from "@/types/boardType";
import ColumnDropIndicator from "./ColumnDropIndicator";
import { Dispatch, DragEvent, SetStateAction } from "react";
import { updateCardOrder } from "@/lib/utils/dataHelper";
import Card from "./Card";
import CardDropIndicator from "./CardDropIndicator";
import AddCard from "./AddCard";
import LoadingCard from "./LoadingCard";
import { handleCardDragEnd, handleDragLeave, handleDragOver, handleDragStart } from "@/lib/utils/dragHelper";

interface ColumnsProps {
    column: ColumnProps;
    cards: CardProps[];
    setCards: Dispatch<SetStateAction<CardProps[]>>;
    fetchData(): Promise<void>;
}

export default function Column({ column, fetchData, cards, setCards }: ColumnsProps) {
    const CARD_DROP_INDICATOR_LABEL = "card";
    const filteredCards = cards.filter((card) => card.columnId === column.id);

    const handleDragEnd = async (e: DragEvent<HTMLDivElement>) => {
        const updateCards = await handleCardDragEnd(e, CARD_DROP_INDICATOR_LABEL, column.id, cards) as CardProps[];

        if (updateCards) {
            updateCardOrder(updateCards);
            setCards(updateCards);
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
                    className="min-w-[300px] p-4 rounded"
                >
                    <h2 className={column?.headingColor}>{column.title}</h2>
                    <hr className="my-4 text-neutral-400/20" />
                </motion.div>
                <div>
                    {!filteredCards ? (
                        Array.from({ length: Math.floor(Math.random() * 4) + 3 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))
                    ) : (
                        <div
                            onDragOver={(e) => handleDragOver(e, CARD_DROP_INDICATOR_LABEL, column.id)}
                            onDragLeave={() => handleDragLeave(CARD_DROP_INDICATOR_LABEL, column.id)}
                            onDrop={(e) => handleDragEnd(e)}>
                            {filteredCards.map((card) => (
                                <Card key={card.id} card={card} fetchData={fetchData} />
                            ))}
                            <CardDropIndicator beforeId={"-1"} column={column.id} />
                            <AddCard columnId={column.id} onCardAdded={fetchData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
