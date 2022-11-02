#!/bin/bash

# this script will grind a public/private keypair starting with 'SPL'
# solana command line tools must be installed :)
# remember to set executable flag: chmod +x grindkey.sh

echo "Making keypairs in folder wallets/free..."
mkdir -p wallets/free
mkdir -p wallets/active
cd wallets/free
solana-keygen grind --starts-with SPL:5
cd ../..
echo "Done."
