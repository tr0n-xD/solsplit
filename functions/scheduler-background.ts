import { Handler, schedule } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { tokenXfer } from "../lib/token-xfer";
import { checkError } from "../lib/error-handling";
import { solXfer } from "../lib/sol-xfer";

const supabase = createClient(process.env.REACT_APP_DB_URL!, process.env.REACT_APP_DB_KEY!);

// This is a scheduled cron job
const handler: Handler = async (event, context) => {
    console.log('Running scheduler...');

    try {
        // look for messages to send
        var {data, error} = await supabase.from('messages').select('*').eq('status', 'WAITING').order('created_at');
        if (error !== null) return {statusCode: 500, body: JSON.stringify(error)};
        if (data) { await sendMessages(data); }

        // look for messages to reward
        var {data, error} = await supabase.from('messages').select('*').eq('status', 'CLAIMED').order('created_at');
        if (error !== null) return {statusCode: 500, body: JSON.stringify(error)};
        if (data) { await sendRewards(data); }

    } catch (e) {
        console.log("Error: " + e);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "OK" }),
    };
};

async function sendMessages(data: any[]) {
    for (const msg of data) {
        console.log('setting message id ' + msg.id + ' to PROCESSING');

        var {error} = await supabase.from('messages')
            .update({status: 'PROCESSING'})
            .eq('id', msg.id);
        checkError(error);
    }

    for (const msg of data) {
        console.log('sending message id ' + msg.id + ' to: ' + msg.toWallet);

        // start server process to transfer the tokens
        let signature = await tokenXfer(msg.toWallet, 1);
        console.log('tokenXfer with sig: ' + signature + '(msg id ' + msg.id + ')');

        var {error} = await supabase.from('messages').update({status: 'SENT'}).eq('id', msg.id);
        checkError(error);
    }
}

async function sendRewards(data: any[]) {
    for (const msg of data) {
        console.log('setting message id ' + msg.id + ' to REWARDING');

        var {error} = await supabase.from('messages').update({status: 'REWARDING'}).eq('id', msg.id);
        checkError(error);
    }

    for (const msg of data) {
        console.log('rewarding message id ' + msg.id + ' to: ' + msg.toWallet);

        // start server process to transfer the tokens
        let signature = await solXfer(msg.toWallet, msg.reward);
        console.log('solXfer with sig: ' + signature + '(msg id ' + msg.id + ')');
        msg.status = 'REWARDED';
        msg.rewarded_at = new Date().toUTCString();
        msg.rewardSignature = signature;
        var {error} = await supabase.from('messages').upsert(msg);
        checkError(error);
    }
}

module.exports.handler = schedule("* * * * *", handler);
