'use client'
import { motion } from "framer-motion";
import { CardProps, ColumnProps } from "@/types/boardType";
import ColumnDropIndicator from "./ColumnDropIndicator";
import { Dispatch, DragEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { deleteColumn, updateCardOrder, updateColumn } from "@/lib/utils/dataHelper";
import Card from "./Card";
import CardDropIndicator from "./CardDropIndicator";
import AddCard from "./AddCard";
import LoadingCard from "./LoadingCard";
import { handleCardDragEnd, handleDragLeave, handleDragOver, handleDragStart } from "@/lib/utils/dragHelper";
import { RiEditLine } from "react-icons/ri";
import { FiTrash } from "react-icons/fi";

interface ColumnsProps {
    column: ColumnProps;
    cards: CardProps[];
    setCards: Dispatch<SetStateAction<CardProps[]>>;
    fetchData(): Promise<void>;
}

export default function Column({ column, fetchData, cards, setCards }: ColumnsProps) {
    const CARD_DROP_INDICATOR_LABEL = "card";

    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(column.title);
    const filteredCards = cards.filter((card) => card.columnId === column.id);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                isEditing
            ) {
                handleColumnUpdate();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing, title]);


    const handleDragEnd = async (e: DragEvent<HTMLDivElement>) => {
        const updateCards = await handleCardDragEnd(e, CARD_DROP_INDICATOR_LABEL, column.id, cards) as CardProps[];

        if (updateCards) {
            updateCardOrder(updateCards);
            setCards(updateCards);
        }
    }

    const handleColumnUpdate = async () => {
        if (isEditing) {
            column.title = title
            await updateColumn(column);
            fetchData();
        }

        setIsEditing(!isEditing);
    }

    const handleColumnDelete = async (id: string) => {
        await deleteColumn(id);
        fetchData();
    }

    return (
        <div className="flex">
            <ColumnDropIndicator beforeId={column.id} />
            <div>
                <motion.div
                    layout
                    layoutId={column.id}
                    draggable
                    onDragStart={(e) => { handleDragStart(e, "columnId", column); setActive(false) }}
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                    className="min-w-[300px] p-4 rounded"
                >
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            className={`w-full p-3 rounded font-bold focus:outline-0 ${column?.headingColor} ${isEditing ? "border-2 border-blue-500 bg-blue-400/30" : ""}`}
                            value={title}
                            readOnly={!isEditing}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <div
                            className={`absolute top-1/2 right-2 -translate-y-1/2 transition duration-300 flex ${active ? "opacity-100" : "opacity-0"}`}
                        >
                            <div
                                onClick={() => handleColumnUpdate()}
                                className="group rounded-tl rounded-bl bg-gray-900 hover:bg-blue-900 p-2 border border-neutral-700 hover:border-blue-700"
                            >
                                <RiEditLine className="text-neutral-500 group-hover:text-blue-600 transition duration-300" />
                            </div>
                            <div
                                onClick={() => handleColumnDelete(column.id)}
                                className="group rounded-tr rounded-br bg-gray-900 hover:bg-red-900 p-2 border border-neutral-700 hover:border-red-700"
                            >
                                <FiTrash className="text-neutral-500 group-hover:text-red-600 transition duration-300" />
                            </div>
                        </div>
                    </div>
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
