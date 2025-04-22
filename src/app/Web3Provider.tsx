"use client";

import { midlConfig, queryClient, wagmiConfig } from "@/app/config";
import { MidlProvider } from "@midl-xyz/midl-js-react";
import { SatoshiKitProvider } from "@midl-xyz/satoshi-kit";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiMidlProvider } from "@midl-xyz/midl-js-executor-react";
import { WagmiProvider } from "wagmi";
import { useMemo } from "react";
import { AddressPurpose } from "@midl-xyz/midl-js-core";

export default function Web3Provider({
	children,
}: { children: React.ReactNode }) {
	const client = useMemo(() => queryClient, []);

	return (
		<WagmiProvider config={wagmiConfig}>
			<MidlProvider config={midlConfig}>
				<SatoshiKitProvider purposes={[AddressPurpose.Ordinals]}>
					<QueryClientProvider client={client}>
						<WagmiMidlProvider />
						{children}
					</QueryClientProvider>
				</SatoshiKitProvider>
			</MidlProvider>
		</WagmiProvider>
	);
}
