import { supabase } from "../supabaseClient"


export const fetchColumns = async () => {
    const { data, error } = await supabase
        .from('columns')
        .select('*')
        .order('order', { ascending: true }) // sort by your custom order field

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