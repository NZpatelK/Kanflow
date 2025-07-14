interface DropIndicatorProps {
    beforeId: string;
    column: string;
}

export default function ColumnDropIndicator( {beforeId, column}: DropIndicatorProps ) {
    return (
        <div 
        data-before={beforeId || "-1"}
        data-board={column}
        className="rounded w-0.5 bg-violet-400 opacity-100"></div>
    )
}