interface DropIndicatorProps {
    beforeId: string;
}

export default function ColumnDropIndicator({ beforeId }: DropIndicatorProps) {
    return (
        <div
            data-before={beforeId || "-1"}
            data-board="board"
            className="rounded w-1 h-full m-4 bg-violet-400 opacity-0"></div>
    )
}