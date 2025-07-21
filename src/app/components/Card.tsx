import { CardProps } from "@/types/boardType"
import { motion } from "framer-motion";
import CardDropIndicator from "./CardDropIndicator";
import { handleDragStart } from "@/lib/utils/dragHelper";
import { DragEvent, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";



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
                    className={`absolute top-1/2 right-2 -translate-y-1/2 transition duration-300 flex ${active ? "opacity-100" : "opacity-0"}`}>
                    <div
                        // onClick={() => handleDeleteCard(id)}
                        className={`group rounded-tl rounded-bl bg-gray-900 hover:bg-blue-900 p-2 border border-neutral-700 hover:border-blue-700`}>
                        <RiEditLine className="text-neutral-500 group-hover:text-blue-600 transition duration-300" />
                    </div>
                    <div
                        // onClick={() => handleDeleteCard(id)}
                        className={`group rounded-tr rounded-br bg-gray-900 hover:bg-red-900 p-2 border border-neutral-700 hover:border-red-700`}>
                        <FiTrash className="text-neutral-500 group-hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </motion.div>
        </>
    )
}