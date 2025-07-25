import { CardProps, ColumnProps } from "@/types/boardType"
import { supabase } from "../supabaseClient"
import { toast } from 'react-toastify';



//-----------------------------------------Columns------------------------------------------//
export const fetchColumns = async () => {
    const { data, error } = await supabase
        .from('columns')
        .select('*')
        .order('order', { ascending: true })

    if (error) console.error('Fetch error:', error)
    else {
        const mapped = data.map(col => ({
            id: col.id,
            title: col.title,
            headingColor: col.heading_color,
        }))

        return mapped
    }
}

export const addColumn = async (title: string, headingColor: string) => {
    if (!title) return Promise.reject(new Error("Title is required"));

    // Get current max order to place new column at the end
    const { data: existing, error: fetchError } = await supabase
        .from('columns')
        .select('order')
        .order('order', { ascending: false })
        .limit(1);

    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return Promise.reject(fetchError);
    }

    const nextOrder = existing?.[0]?.order + 1 || 1;

    const { error } = await supabase.from('columns').insert([
        {
            id: crypto.randomUUID(),
            title,
            heading_color: headingColor,
            order: nextOrder,
        },
    ]);

    if (error) {
        console.error('Insert failed:', error);
        return Promise.reject(error);
    }

    return Promise.resolve("Column added successfully");
};


export const updateColumnOrder = async (columns: ColumnProps[]) => {
    const updateColumns = columns.map((col, index) => ({
        id: col.id,
        title: col.title,
        heading_color: col.headingColor,
        order: index + 1
    }))

    const { error } = await supabase
        .from('columns')
        .upsert(updateColumns, { onConflict: 'id' })

    if (error) console.error('Order update failed', error)
}

export const updateColumn = async (column: ColumnProps) => {
    const { error } = await supabase
        .from('columns')
        .update({
            title: column.title,
            heading_color: column.headingColor,
        })
        .eq('id', column.id);

    if (error) {
        console.error('Update failed:', error);
        return Promise.reject(error);
    }

    return Promise.resolve("Column updated successfully");
};

export const deleteColumn = async (columnId: string) => {
    const { error } = await supabase.from('columns').delete().eq('id', columnId);

    if (error) {
        console.error('Delete failed:', error);
        return Promise.reject(error);
    }

    return Promise.resolve("Column deleted successfully");
};

//-----------------------------------------Cards------------------------------------------//

export const renameField = async (data: any) => {

    const transformedCards = data.map((card: any) => ({
        ...card,
        columnId: card.column_id, // rename column_id to columnId
    }));

    return transformedCards

}
export const fetchCards = async () => {
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('order', { ascending: true })

    if (error) console.error('Fetch error:', error)
    else {
        return renameField(data)
    }
}

export const fetchCardsByColumnId = async (columnId: string) => {
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('column_id', columnId)
        .order('order', { ascending: true })

    if (error) console.error('Fetch error:', error)
    else {
        return renameField(data)
    }
}

export const addCard = async (message: string, columnId: string) => {
    if (!message) return Promise.reject(new Error("Message is required"));

    const { data: existing, error: fetchError } = await supabase
        .from('cards')
        .select('order')
        .eq('column_id', columnId)
        .order('order', { ascending: false })
        .limit(1);

    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return Promise.reject(fetchError);
    }

    const nextOrder = existing?.[0]?.order + 1 || 1;

    const { error } = await supabase.from('cards').insert([
        {
            id: crypto.randomUUID(),
            message,
            column_id: columnId,
            order: nextOrder,
        },
    ]);

    if (error) {
        console.error('Insert failed:', error);
        return Promise.reject(error);
    }

    return Promise.resolve("Card added successfully");
};


export const updateCard = async (card: CardProps) => {
    const { error } = await supabase
        .from('cards')
        .update({
            message: card.message,
        })
        .eq('id', card.id);

    if (error) {
        console.error('Update failed:', error);
        return Promise.reject(error);
    }

    return Promise.resolve("Card updated successfully");
};


export const updateCardOrder = async (cards: CardProps[]) => {
    const updateCards = cards.map((card, index) => ({
        id: card.id,
        message: card.message,
        column_id: card.columnId,
        order: index + 1
    }))

    const { error } = await supabase
        .from('cards')
        .upsert(updateCards, { onConflict: 'id' })

    if (error) console.error('Order update failed', error)
}

export const deleteCard = async (cardId: string) => {
  const { error } = await supabase.from('cards').delete().eq('id', cardId);

  if (error) {
    console.error('Delete failed:', error);
    return Promise.reject(error);
  }

  return Promise.resolve("Card deleted successfully");
};


