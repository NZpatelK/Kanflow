import { ColumnProps } from "../types/boardType";

export default function Column({ column }: { column: ColumnProps }) {
    return (
        <div 
        draggable
        className="w-100 h-200 bg-neutral-500/20 p-4 rounded">
            <h2 className={`${column.headingColor} font-semibold`}>{column.title}</h2>
            <hr className="my-4 text-neutral-400/20" />
        </div>
    );
}