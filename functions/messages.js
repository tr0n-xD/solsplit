const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(process.env.REACT_APP_DB_URL, process.env.REACT_APP_DB_KEY);

// Our standard serverless handler function
exports.handler = async event => {
    const params = event.queryStringParameters;
    // console.log('reading messages for wallet ' + params.walletKey + '...');
    //
    // var { data, error } = await supabase
    //     .from('messages')
    //     .select('*')
    //     .eq('toWallet', params.walletKey)
    //     // .eq('status', 'SENT')
    //     .order('id', {ascending: false})
    // ;
    // if (error !== null) return {statusCode: 500,headers: {'access-control-allow-origin': '*'}, body: JSON.stringify(error)};
    let data = [];

    return { statusCode: 200, headers: {'access-control-allow-origin': '*'}, body: JSON.stringify(data, null, 4) };
}
