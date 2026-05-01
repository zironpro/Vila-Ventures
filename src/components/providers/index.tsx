"use client";

import { MotionConfig } from "motion/react";

import OpenPanelProvider from "./open-panel";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		// <BProgressProvider>
		<OpenPanelProvider>
			<MotionConfig reducedMotion="user">
				{/* <LenisProvider> */}
				{children}
				{/* </LenisProvider> */}
			</MotionConfig>
		</OpenPanelProvider>
		// </BProgressProvider>
	);
};
