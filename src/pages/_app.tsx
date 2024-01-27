import '.../styles/globals.css'

import type { AppProps } from 'next/app'

import { WagmiConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getDefaultWallets, configureChains } from 'wagmi'
import { mainnet, goerli, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { darkTheme } from '@rainbow-me/rainbowkit/themes'

const { chains, publicClient } = configureChains(
  [mainnet, goerli, sepolia],
  [
    // Put your Infura API key in a `.env` file.
    infuraProvider({
      apiKey: process.env.INFURA_KEY ?? '',
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'block chat',
  // Put your WalletConnect Cloud project ID here.
  projectId: 'b0a6b7ab02a4090553750be07a5728a6',
  chains,
})

const wagmiConfig = {
  autoConnect: true,
  connectors,
  publicClient,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#495057',
          accentColorForeground: 'white',
        })}
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
