// import { createClient } from "@supabase/supabase-js";
import { tokenXfer } from "../lib/token-xfer";
// const supabase = createClient(process.env.REACT_APP_DB_URL!, process.env.REACT_APP_DB_KEY!);

// Our standard serverless handler function
exports.handler = async (event : any) => {
    const params = event.queryStringParameters;
    console.log('sending token to ' + params.walletKey + '...');


    return {
        statusCode: 200,
        headers: {'access-control-allow-origin': '*'},
        body: JSON.stringify({message: 'OK'}, null, 4)
    };
}

