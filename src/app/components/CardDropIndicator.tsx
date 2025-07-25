interface DropIndicatorProps {
    beforeId: string;
    column: string;
}

export default function CardDropIndicator({ beforeId, column }: DropIndicatorProps) {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-1 h-0.5 w-full bg-violet-400 opacity-0"></div>
    )
}