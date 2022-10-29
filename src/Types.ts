
export interface Nft {
    id: number,
    name: string,
    image: string,
}

export interface Message {
    id: number,
    status: string,
    fromWallet: string,
    fromAlias: string,
    toWallet: string,
    text: string,
    reward: string | undefined,
    rewardSignature: string | undefined,
    sent_at: Date | undefined,
    opened_at: Date | undefined,
    rewarded_at: Date | undefined,
    deleted_at: Date | undefined,
}
