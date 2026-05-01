"use client";

import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
} from "react";

import {
	Dialog,
	DialogCreateHandle,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerCreateHandle,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPanel,
	DrawerPopup,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";

import { BookingFormModal, BookingFormModalTrigger } from "./booking-form";
import { Selector } from "./plan-selector";

export type TypeClass = "hatha" | "vinyasa flow" | "kids";
export type ClassType = "virtual" | "physical";
export type FormatType = "group" | "private";

export interface PlanData {
	name: string;
	classes: number;
	frequency: string;
	price: number;
	popular?: boolean;
}

interface MembershipSelectionContextValue {
	typeClass: TypeClass;
	setTypeClass: Dispatch<SetStateAction<TypeClass>>;
	classType: ClassType;
	setClassType: Dispatch<SetStateAction<ClassType>>;
	formatType: FormatType;
	setFormatType: Dispatch<SetStateAction<FormatType>>;
	selectedPlan: PlanData | null;
	setSelectedPlan: Dispatch<SetStateAction<PlanData | null>>;
	currentPlans: PlanData[];
	closeAllModals: () => void;
}

const MembershipSelectionContext =
	createContext<MembershipSelectionContextValue | null>(null);

const PLANS: Record<ClassType, Record<FormatType, PlanData[]>> = {
	virtual: {
		group: [
			{ name: "Starter", classes: 4, frequency: "1 Per Week", price: 180 },
			{
				name: "Regular",
				classes: 8,
				frequency: "2 Per Week",
				price: 300,
				popular: true,
			},
			{ name: "Intensive", classes: 12, frequency: "3 Per Week", price: 420 },
		],
		private: [
			{ name: "Starter", classes: 4, frequency: "1 Per Week", price: 350 },
			{ name: "Regular", classes: 8, frequency: "2 Per Week", price: 650 },
			{ name: "Intensive", classes: 12, frequency: "3 Per Week", price: 950 },
		],
	},
	physical: {
		group: [
			{ name: "Starter", classes: 4, frequency: "1 Per Week", price: 250 },
			{
				name: "Regular",
				classes: 8,
				frequency: "2 Per Week",
				price: 450,
				popular: true,
			},
			{ name: "Intensive", classes: 12, frequency: "3 Per Week", price: 600 },
		],
		private: [
			{ name: "1 Person", classes: 1, frequency: "Per Session", price: 250 },
			{ name: "2-3 Person", classes: 1, frequency: "Per Person", price: 200 },
		],
	},
};

interface PlansModalProps {
	children: React.ReactElement;
}

export const FORM_TITLE = "Choose Your Yoga Plan";
export const FORM_DESCRIPTION = "Flexible options for your wellness journey";

export function MembershipSelectionProvider({
	children,
	onCloseAllModals,
}: {
	children: React.ReactNode;
	onCloseAllModals: () => void;
}) {
	const [typeClass, setTypeClass] = useState<TypeClass>("hatha");
	const [classType, setClassType] = useState<ClassType>("virtual");
	const [formatType, setFormatType] = useState<FormatType>("group");
	const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);

	const currentPlans = PLANS[classType][formatType];

	return (
		<MembershipSelectionContext.Provider
			value={{
				typeClass,
				setTypeClass,
				classType,
				setClassType,
				formatType,
				setFormatType,
				selectedPlan,
				setSelectedPlan,
				currentPlans,
				closeAllModals: onCloseAllModals,
			}}
		>
			{children}
		</MembershipSelectionContext.Provider>
	);
}

export function useMembershipSelection() {
	const context = useContext(MembershipSelectionContext);

	if (!context) {
		throw new Error(
			"useMembershipSelection must be used within a MembershipSelectionProvider"
		);
	}

	return context;
}

const bookClassDrawerHandle = DrawerCreateHandle();
const bookClassDialogHandle = DialogCreateHandle();

export function BookClassModalTrigger({ children }: PlansModalProps) {
	const isMobile = useMediaQuery("max-md");

	if (isMobile) {
		return <DrawerTrigger handle={bookClassDrawerHandle} render={children} />;
	}

	return <DialogTrigger handle={bookClassDialogHandle} render={children} />;
}

export function MembershipModal() {
	const isMobile = useMediaQuery("max-md");
	const [open, setOpen] = useState(false);

	if (isMobile) {
		return (
			<MembershipSelectionProvider onCloseAllModals={() => setOpen(false)}>
				<Drawer
					handle={bookClassDrawerHandle}
					onOpenChange={setOpen}
					open={open}
				>
					{/* <DrawerTrigger render={trigger} /> */}
					<DrawerPopup showBar>
						<DrawerHeader>
							<DrawerTitle>{FORM_TITLE}</DrawerTitle>
							<DrawerDescription>{FORM_DESCRIPTION}</DrawerDescription>
						</DrawerHeader>

						<DrawerPanel className="grid gap-4" scrollable={false}>
							<Selector />
						</DrawerPanel>
						<DrawerFooter>
							<BookingFormModalTrigger />
							<BookingFormModal />
						</DrawerFooter>
					</DrawerPopup>
				</Drawer>
			</MembershipSelectionProvider>
		);
	}

	return (
		<MembershipSelectionProvider onCloseAllModals={() => setOpen(false)}>
			<Dialog handle={bookClassDialogHandle} onOpenChange={setOpen} open={open}>
				{/* <DialogTrigger render={trigger} /> */}
				<DialogPopup>
					<DialogHeader className="border-b">
						<DialogTitle>{FORM_TITLE}</DialogTitle>
						<DialogDescription>{FORM_DESCRIPTION}</DialogDescription>
					</DialogHeader>

					<DialogPanel className="mt-4 grid gap-4">
						<Selector />
					</DialogPanel>
					<DialogFooter>
						<BookingFormModalTrigger />
						<BookingFormModal />
					</DialogFooter>
				</DialogPopup>
			</Dialog>
		</MembershipSelectionProvider>
	);
}
