import { addCard } from "@/lib/utils/dataHelper";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCardProps {
    columnId: string
    onCardAdded: () => void;
}

export default function AddCard({ columnId, onCardAdded }: AddCardProps) {
    const [message, setMessage] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await toast.promise(
            addCard(message, columnId),
            {
                pending: 'Adding card...',
                success: 'Card added successfully! 🎉',
                error: 'Failed to add card 😞',
            },
            {
                autoClose: 1500,
            }
        );
        setAdding(false);
        setMessage("");
        onCardAdded();
    };

    return (
        <>
            <>
                {adding ? (
                    <motion.form
                        layout
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            autoFocus
                            placeholder="Add new task..."
                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                        />
                        <div className="mt-1.5 flex items-center justify-end gap-1.5">
                            <button
                                type="button"
                                onClick={() => setAdding(false)}
                                className="px-3 py-1.5 text-xs text-neutral-400 transition-all hover:text-neutral-50"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-all hover:bg-neutral-300"
                            >
                                Add
                                {/* <FaPlus /> */}
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <button
                        onClick={() => setAdding(true)}
                        className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                    >
                        <span>Add Card</span>
                        {/* <FiPlus /> */}
                    </button>
                )}
            </>
        </>
    )
}