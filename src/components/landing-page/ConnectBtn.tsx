import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
} from "wagmi";
import { mainnet, goerli, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
  [mainnet, goerli, sepolia],
  [
    // Put your Infura API key in a `.env` file.
    infuraProvider({
      apiKey: process.env.INFURA_KEY ?? "",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "block chat",
  // Put your Infura Project ID in a `.env` file.
  projectId: process.env.INFURA_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Home() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#495057",
            accentColorForeground: "white",
          })}
          chains={chains}
        >
          <div>
            <ConnectButton />
            {/* <div>{address}</div> */}
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
