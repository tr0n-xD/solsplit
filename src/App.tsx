import { PublicKey, Transaction } from "@solana/web3.js";
import * as React from "react";
import { useState } from "react";

import "./App.css";
import MainScreen from "./MainScreen";

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

export const KeyContext = React.createContext<string | undefined>(null!);

export default function App(props: {view: any}) {
  const [walletKey, setWalletKey] = useState<string | undefined>(undefined);

  const connectWallet = async () => {
    // @ts-ignore
    const {solana} = window;

    if (solana) {
      try {
        const response = await solana.connect({onlyIfTrusted: false});
        let key = response.publicKey.toString();
        console.log("wallet account ", key);
        setWalletKey(key);
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
    }
  };

  return (
      <KeyContext.Provider value={walletKey}>
          <div className="App">
            { (props.view === 'welcome') && <MainScreen view='main' connect={connectWallet} disconnect={disconnectWallet}/> }
            { (props.view === 'create') && <MainScreen view='create' connect={connectWallet} disconnect={disconnectWallet}/> }
          </div>
      </KeyContext.Provider>
  );
}
