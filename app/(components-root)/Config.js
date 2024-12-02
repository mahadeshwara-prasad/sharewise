"use client"
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { polygonMumbai, sepolia } from 'viem/chains';
import { createConfig, configureChains } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";


export default function Config({children}){
      
          const { chains, publicClient} = configureChains(
              [sepolia],
              [
                jsonRpcProvider({
                  rpc: (chain) => ({
                    http: `https://rpc-mumbai.maticvigil.com`,
                  }),
                }),
                publicProvider(),
              ]
            )
            
            const { connectors } = getDefaultWallets({
              appName: 'My RainbowKit App',
              projectId: '43d0057f5a76add79e5f46af2bc61256',
              chains
            });
            
            const config = createConfig({
              autoConnect: true,
              publicClient,
              connectors,
            });

      return(
        <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains}>
              {children}
            </RainbowKitProvider>
        </WagmiConfig>
      );
}

