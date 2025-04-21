import { type Config, regtest } from "@midl-xyz/midl-js-core";
import { createMidlConfig } from "@midl-xyz/satoshi-kit";
import { QueryClient } from "@tanstack/react-query";
import { midlRegtest } from "@midl-xyz/midl-js-executor";
import type { Chain } from "viem";
import { createConfig, http } from "wagmi";

export const midlConfig = createMidlConfig({
	networks: [regtest],
	persist: true,
}) as Config;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			experimental_prefetchInRender: true,
		},
	},
});

export const wagmiConfig = createConfig({
	chains: [
		{
			...midlRegtest,
			rpcUrls: {
				default: {
					http: [midlRegtest.rpcUrls.default.http[0]],
				},
			},
		} as Chain,
	],
	transports: {
		[midlRegtest.id]: http(midlRegtest.rpcUrls.default.http[0]),
	},
});
