import { CardProps } from "@/types/boardType"
import { motion } from "framer-motion";
import CardDropIndicator from "./CardDropIndicator";
import { useState } from "react";
import { handleDragStart } from "@/lib/utils/dragHelper";
import { DragEvent } from "react";

interface DisplayCardProps {
    card: CardProps
}

export default function Card({ card }: DisplayCardProps) {
    const [active, setActive] = useState(false);


    const handleCardDragStart = (e: DragEvent<HTMLDivElement>) => {
        setActive(false);
        handleDragStart(e, "cardId", card);
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
                className="relative cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
                <p className="text-sm text-neutral-100">
                    {card.message}
                </p>
                <div
                    // onClick={() => handleDeleteCard(id)}
                    className={`group absolute rounded top-1/2 right-2 transition duration-300 bg-gray-900 hover:bg-red-900 p-2 border border-neutral-700 hover:border-red-700 -translate-y-1/2 flex gap-2 ${active ? "opacity-100" : "opacity-0"}`}>
                    {/* <FiTrash className="text-neutral-500 group-hover:text-red-600 transition duration-300" /> */}
                    <span className="text-neutral-500 text-xs group-hover:text-red-600 transition duration-300">Delete</span>
                </div>
            </motion.div>
        </>
    )
}