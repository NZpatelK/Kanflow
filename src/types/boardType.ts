export interface ColumnProps {
    id: string;
    title: string;
    headingColor: string;
}

export interface CardProps {
    id: string;
    message: string;
    columnId: string;
}