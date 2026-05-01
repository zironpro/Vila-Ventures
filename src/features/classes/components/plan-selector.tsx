import { CheckIcon, StarIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Currency } from "@/assets/icons/currency";

import { cn } from "@/lib/utils";
import { pluralize } from "@/lib/utils/pluralize";

import { ClassType, TypeClass, useMembershipSelection } from "./booking-modal";

export function Selector() {
	const {
		typeClass,
		setTypeClass,
		classType,
		setClassType,
		formatType,
		setFormatType,
		selectedPlan,
		setSelectedPlan,
		currentPlans,
	} = useMembershipSelection();

	return (
		<div className="space-y-6">
			{/* Step 1: Class Type */}
			<div className="space-y-2.5">
				<div className="flex items-center gap-2">
					<div className="flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs">
						1
					</div>
					<h3 className="font-medium text-muted-foreground">
						Select Class Type
					</h3>
				</div>

				<div className="flex gap-2">
					{(["hatha", "vinyasa flow", "kids"] as TypeClass[]).map((type) => (
						<Button
							className="flex-1 capitalize"
							key={type}
							onClick={() => {
								setTypeClass(type);
								setSelectedPlan(null);
							}}
							size="lg"
							variant={typeClass === type ? "default" : "outline"}
						>
							{type} Yoga
						</Button>
					))}
				</div>
			</div>
			{/* Step 1: Class Type */}
			<div className="space-y-2.5">
				<div className="flex items-center gap-2">
					<div className="flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs">
						2
					</div>
					<h3 className="font-medium text-muted-foreground">
						Select Class Type
					</h3>
				</div>

				<div className="flex gap-3">
					{(["virtual", "physical"] as ClassType[]).map((type) => (
						<Button
							className="flex-1"
							key={type}
							onClick={() => {
								setClassType(type);
								setSelectedPlan(null);
							}}
							size="lg"
							variant={classType === type ? "default" : "outline"}
						>
							{type === "virtual" ? "Virtual Classes" : "Physical Classes"}
						</Button>
					))}
				</div>
			</div>

			{/* Step 2: Format Type */}
			<div className="space-y-2.5">
				<div className="flex items-center gap-2">
					<div className="flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs">
						3
					</div>
					<h3 className="font-medium text-muted-foreground">Select Format</h3>
				</div>

				<div className="flex gap-3">
					<Button
						className="flex-1"
						onClick={() => {
							setFormatType("group");
							setSelectedPlan(null);
						}}
						size="lg"
						variant={formatType === "group" ? "default" : "outline"}
					>
						Group Classes
					</Button>
					<Button
						className="flex-1"
						onClick={() => {
							setFormatType("private");
							setSelectedPlan(null);
						}}
						size="lg"
						variant={formatType === "private" ? "default" : "outline"}
					>
						{classType === "physical" && formatType === "private"
							? "Private (Max 3 Students)"
							: "Private Classes"}
					</Button>
				</div>
			</div>

			{/* Step 3: Plan Cards */}
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<div className="flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs">
						4
					</div>
					<h3 className="font-medium text-muted-foreground">
						Choose Your Plan
					</h3>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="grid gap-4"
						exit={{ opacity: 0, y: -10 }}
						initial={{ opacity: 0, y: 10 }}
						key={`${classType}-${formatType}`}
						transition={{ duration: 0.3 }}
					>
						{currentPlans.map((plan) => (
							<button
								className={cn(
									"relative isolate z-0 overflow-visible rounded-2xl p-6 text-left transition-all duration-300",
									selectedPlan === plan
										? "bg-white ring-2 ring-primary"
										: "bg-muted/60 hover:bg-muted"
								)}
								key={plan.name}
								onClick={() => setSelectedPlan(plan)}
							>
								<div className="flex items-start justify-between gap-3">
									<div className="flex-1">
										<div className="flex items-center gap-3">
											<div className="flex items-center gap-2">
												<h4 className="font-semibold text-xl">{plan.name}</h4>
												{plan.popular && (
													<Badge
														className="h-5 border border-primary/60 bg-card px-2.5 font-medium text-primary text-xs"
														variant="secondary"
													>
														<StarIcon
															className="size-2.5"
															data-icon="inline-start"
															weight="fill"
														/>
														Best Value
													</Badge>
												)}
											</div>
											{selectedPlan === plan && (
												<motion.div
													animate={{ scale: 1 }}
													className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary"
													initial={{ scale: 0 }}
												>
													<CheckIcon className="text-white" />
												</motion.div>
											)}
										</div>
										<div className="flex items-center gap-2 text-[#6B5D4F] text-sm">
											<span>
												{pluralize({
													count: plan.classes,
													singular: "Class",
													plural: "Classes",
												})}
											</span>
											<span className="size-1 rounded-full bg-muted-foreground/50" />
											<span>{plan.frequency}</span>
										</div>
									</div>
									<div className="text-right">
										<div className="mb-1 font-medium text-2xl">
											{plan.price}
											<Currency className="ml-0.5 inline text-muted-foreground" />
										</div>
										{classType === "physical" &&
											formatType === "private" &&
											plan.name === "2-3 Person" && (
												<div className="text-xs">Per Person</div>
											)}
									</div>
								</div>
							</button>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
