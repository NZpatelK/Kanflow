import { DragEvent } from "react";
import { ColumnProps } from "../../types/boardType";


//---------------------------Handle Drag Functions---------------------------//

export const handleDragStart = (e: DragEvent<HTMLDivElement>, dataLabel: string, data: ColumnProps) => {
    e.dataTransfer.setData(dataLabel, data.id);
    // if (dataLabel === "columnId") {
    //     setIsCardDisabled(true);
    // }
}

export const handleDragOver = (e: DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();

    // if (isCardDisabled || type === "board") {
    highlightIndicator(e, type);
    // setActive(true);
    // }
}

export const handleDragEnd = (e: DragEvent<HTMLDivElement>, type: string, columns: ColumnProps[]) => {
    e.preventDefault();
    // setActive(false);
    clearHighlights(type);

    const columnId = e.dataTransfer.getData("columnId");
    const indicators = getIndicators(type);
    const { element } = getNearestIndicator(e, indicators as HTMLDivElement[]);

    const before = element.dataset.before || "-1";

    if (before !== columnId) {
        let copy = [...columns];

        let columnToTransfer = copy.find((c) => c.id === columnId);
        if (!columnToTransfer) return;
        columnToTransfer = { ...columnToTransfer };

        copy = copy.filter((c) => c.id !== columnId);

        const moveToBack = before === "-1";

        if (moveToBack) {
            copy.push(columnToTransfer);
        } else {
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex === undefined) return;

            copy.splice(insertAtIndex, 0, columnToTransfer);
        }

        return copy;
    }
}

//---------------------------Drag Event Trigger Functions---------------------------//

export const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[]
): { offset: number; element: HTMLDivElement } => {
    return indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = e.clientX - (box.left + 50);

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        }
    );
};

export const highlightIndicator = (e: DragEvent<HTMLDivElement>, type: string, column?: string) => {
    const indicators = getIndicators(type, column);
    clearHighlights(type, indicators, column);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
};

export const clearHighlights = (type: string, els?: HTMLDivElement[], column?: string) => {
    const indicators = els || getIndicators(type, column);
    indicators.forEach((i) => {
        i.style.opacity = "0";
    });
};

export const getIndicators = (type: string, column?: string): HTMLDivElement[] => {
    if (type === "card") {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }
    else {
        return Array.from(document.querySelectorAll(`[data-board="board"]`));
    }
};
