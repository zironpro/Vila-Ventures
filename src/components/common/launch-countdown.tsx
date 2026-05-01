"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";

type CountdownParts = {
	hours: number;
	minutes: number;
	seconds: number;
	isLive: boolean;
};

const LIVE_STATE: CountdownParts = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	isLive: true,
};

const getTargetTime = () => {
	const now = new Date();
	const target = new Date(now);

	target.setHours(12, 0, 0, 0);

	return target;
};

const getCountdown = (targetTime: Date): CountdownParts => {
	const diffMs = targetTime.getTime() - Date.now();

	if (diffMs <= 0) return LIVE_STATE;

	const totalSeconds = Math.floor(diffMs / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return {
		hours,
		minutes,
		seconds,
		isLive: false,
	};
};

export const LaunchCountdown = () => {
	const isDev = process.env.NODE_ENV === "development";
	const targetTime = useMemo(() => getTargetTime(), []);
	const didCelebrate = useRef(false);
	const [isVisible, setIsVisible] = useState(true);
	const [time, setTime] = useState<CountdownParts>({
		hours: 0,
		minutes: 0,
		seconds: 0,
		isLive: false,
	});

	useEffect(() => {
		if (isDev) return;

		const updateCountdown = () => {
			setTime(getCountdown(targetTime));
		};

		updateCountdown();
		const timer = window.setInterval(updateCountdown, 1000);

		return () => window.clearInterval(timer);
	}, [isDev, targetTime]);

	useEffect(() => {
		if (isDev) return;
		if (!time.isLive || didCelebrate.current) return;

		didCelebrate.current = true;

		void import("canvas-confetti").then(({ default: confetti }) => {
			const end = Date.now() + 2500;

			const burst = () => {
				confetti({
					particleCount: 110,
					spread: 120,
					origin: { y: 0.6 },
				});
			};

			burst();
			const timer = window.setInterval(() => {
				if (Date.now() > end) {
					window.clearInterval(timer);
					return;
				}

				burst();
			}, 350);
		});
	}, [isDev, time.isLive]);

	useEffect(() => {
		if (isDev) return;
		if (!time.isLive) return;

		const hideTimer = window.setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => window.clearTimeout(hideTimer);
	}, [isDev, time.isLive]);

	if (isDev || !isVisible) return null;

	return (
		<div className="fixed inset-0 z-99999 flex items-center justify-center bg-primary px-6 text-card">
			<AnimatePresence mode="wait">
				{time.isLive ? (
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						className="flex max-w-2xl flex-col items-center text-center"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0, scale: 0.92 }}
						key="live"
						transition={{ duration: 0.45, ease: "easeOut" }}
					>
						<h2 className="font-display text-4xl sm:text-6xl">
							We are live now!
						</h2>
						<p className="mt-4 text-balance text-card/85 text-lg sm:text-2xl">
							Welcome to Vila Ventures.
						</p>
					</motion.div>
				) : (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="flex w-full max-w-3xl flex-col items-center rounded-2xl border border-card/20 bg-card/10 p-8 text-center shadow-2xl"
						exit={{ opacity: 0, y: -24 }}
						initial={{ opacity: 0, y: 24 }}
						key="countdown"
						transition={{ duration: 0.4, ease: "easeOut" }}
					>
						<p className="text-card/80 text-sm uppercase tracking-[0.22em]">
							Launching today at 12PM, GST.
						</p>
						<div className="mt-5 flex items-center gap-3 font-semibold text-5xl sm:text-7xl">
							<NumberFlow
								className="w-28 rounded-lg bg-card/20 px-3 py-2"
								format={{ minimumIntegerDigits: 2, useGrouping: false }}
								spinTiming={{ duration: 1000, easing: "ease-out" }}
								value={time.hours}
								willChange
							/>
							<span className="text-card/60">:</span>
							<NumberFlow
								className="w-28 rounded-lg bg-card/20 px-3 py-2"
								format={{ minimumIntegerDigits: 2, useGrouping: false }}
								spinTiming={{ duration: 1000, easing: "ease-out" }}
								value={time.minutes}
								willChange
							/>
							<span className="text-card/60">:</span>
							<NumberFlow
								className="w-28 rounded-lg bg-card/20 px-3 py-2"
								format={{ minimumIntegerDigits: 2, useGrouping: false }}
								spinTiming={{ duration: 1000, easing: "ease-out" }}
								value={time.seconds}
								willChange
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
