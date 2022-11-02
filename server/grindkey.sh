#!/bin/bash

# this script will grind a public/private keypair starting with 'SPL'
# solana command line tools must be installed :)
# remember to set executable flag: chmod +x grindkey.sh

solana-keygen grind --starts-with SPL:1
