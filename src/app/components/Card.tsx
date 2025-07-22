import { CardProps } from "@/types/boardType"
import { motion } from "framer-motion";
import CardDropIndicator from "./CardDropIndicator";
import { handleDragStart } from "@/lib/utils/dragHelper";
import { DragEvent, useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { deleteCard, updateCard } from "@/lib/utils/dataHelper";



interface DisplayCardProps {
    card: CardProps
    fetchData(): Promise<void>;
}

export default function Card({ card, fetchData }: DisplayCardProps) {
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(card.message);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                isEditing
            ) {
                handleUpdateMessage();
            }
        };

        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing, message]);

    const handleCardDragStart = (e: DragEvent<HTMLDivElement>) => {
        setActive(false);
        handleDragStart(e, "cardId", card);
    }

    const handleDeleteCard = (id: string) => {
        deleteCard(id);
        fetchData();
    }

    const handleUpdateMessage = async () => {
        if (isEditing) {
            card.message = message
            await updateCard(card);
            fetchData();
        }

        setIsEditing(!isEditing);
    }

    return (
        <>
            <CardDropIndicator beforeId={card.id} column={card.columnId} />
            <motion.div
                layout
                layoutId={card.id}
                draggable
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                onDragStart={(e) => handleCardDragStart(e)}
                className="relative"
            >

                <textarea
                    ref={inputRef}
                    value={message}
                    readOnly={!isEditing}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    rows={1}
                    className={`w-full h-full resize-none overflow-hidden p-3 rounded focus:outline-0  ${isEditing ? "border-2 border-blue-500 bg-blue-400/30" : "cursor-grab active:cursor-grabbing border border-neutral-700 bg-neutral-800"}`}
                />
                <div
                    className={`absolute top-2 right-2 transition duration-300 flex ${active ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        onClick={() => handleUpdateMessage()}
                        className="group rounded-tl rounded-bl bg-gray-900 hover:bg-blue-900 p-2 border border-neutral-700 hover:border-blue-700 cursor-pointer"
                    >
                        <RiEditLine className="text-neutral-500 group-hover:text-blue-600 transition duration-300" />
                    </div>
                    <div
                        onClick={() => handleDeleteCard(card.id)}
                        className="group rounded-tr rounded-br bg-gray-900 hover:bg-red-900 p-2 border border-neutral-700 hover:border-red-700 cursor-pointer"
                    >
                        <FiTrash className="text-neutral-500 group-hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </motion.div>
        </>
    );
}
