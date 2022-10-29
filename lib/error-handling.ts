import PostgrestFilterBuilder from "@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder";

export async function noError(query: PostgrestFilterBuilder<any>) {
    let {data, error} = await query;
    checkError(error);
    return data;
}

export function checkError(error : any) {
    if (error) {
        console.log(error);
        throw new Error(error);
    }
}
