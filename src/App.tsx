import { clusterApiUrl, Connection, PublicKey, Transaction } from "@solana/web3.js";
import * as React from "react";
import { useEffect, useState } from "react";

import "./App.css";
import Welcome from "./Welcome";
import { Message } from "./Types";
import { fn_url } from "./Config";

global.Buffer = global.Buffer || require('buffer').Buffer;

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
    | "connect"
    | "disconnect"
    | "signTransaction"
    | "signAllTransactions"
    | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
      message: Uint8Array | string,
      display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

export interface Wallet {
  key: string | undefined,
  provider: any | undefined,
  connect: any | undefined,
  disconnect: any | undefined,
  player: Player,
}

export interface Player {
  sol: number | undefined,
  messages: Message[] | undefined,
}

export const WalletContext = React.createContext<Wallet>(null!);

export default function App(props: {screen: any}) {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(undefined);
  const [walletKey, setWalletKey] = useState<string | undefined>(undefined);

  const [sol, setSol] = useState<number | undefined>(undefined);
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);

  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };

  const connectWallet = async () => {
    // @ts-ignore
    const {solana} = window;

    if (solana) {
      try {
        const response = await solana.connect({onlyIfTrusted: false});
        let key = response.publicKey.toString();
        console.log("wallet account ", key);
        setWalletKey(key);
        loadMessages(key);
        loadSol(key);
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  const disconnectWallet = async () => {
    // @ts-ignore
    const {solana} = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
      setSol(undefined);
    }
  };

  // detect phantom provider exists
  useEffect(() => {
    const init = async () => {
      const provider = getProvider();
      if (provider) {
        // await connectWallet();
        setProvider(provider);
      } else setProvider(undefined);
    }
    init();
  }, []);

  const loadSol = async (walletKey: string) => {
    console.log('looking up sol balance ', walletKey);
    let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    connection.getBalance(new PublicKey(walletKey)).then(function (value) {
      setSol(Math.floor(value / 10000000) / 100);
    })
  };

  const loadMessages = async (walletKey: string) => {
    console.log('loading messages...');
    setMessages(undefined);
    let messages: Message[] = await fetch(fn_url + "messages?walletKey=" + walletKey).then(response => response.json());
    setMessages(messages);
  }

  let player : Player = {
    sol: sol,
    messages: messages,
  };

  let wallet = {key: walletKey, provider: provider, connect: connectWallet, disconnect: disconnectWallet, player: player };

  return (
      <WalletContext.Provider value={wallet}>
          <div className="App">
            { (props.screen === 'welcome') && <Welcome panel='main'/> }
            { (props.screen === 'messages') && <Welcome panel='messages'/> }
            { (props.screen === 'send') && <Welcome panel='send'/> }
            { (props.screen === 'receipts') && <Welcome panel='receipts'/> }
            { (props.screen === 'topup') && <Welcome panel='topup'/> }
            { (props.screen === 'help') && <Welcome panel='help'/> }
          </div>
      </WalletContext.Provider>
  );
}
