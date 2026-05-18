"use client";

import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";

import { usePathname } from "next/navigation";

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
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
	getBookingSourceFromPathname,
	getClassSlugFromPathname,
} from "@/lib/analytics/get-booking-source";
import { useTrackEvent } from "@/lib/analytics/use-track-event";

import { SCHEDULES, type ScheduleData } from "../schedules";
import type {
	ClassType,
	FormatType,
	PlanData,
	PlansMap,
	TypeClass,
} from "../types/plans";
import { BookingFormModal, BookingFormModalTrigger } from "./booking-form";
import { Selector } from "./plan-selector";

export type { ScheduleData } from "../schedules";
export type {
	ClassType,
	FormatType,
	PlanData,
	TypeClass,
} from "../types/plans";

interface MembershipSelectionContextValue {
	typeClass: TypeClass;
	setTypeClass: Dispatch<SetStateAction<TypeClass>>;
	classType: ClassType;
	setClassType: Dispatch<SetStateAction<ClassType>>;
	formatType: FormatType;
	setFormatType: Dispatch<SetStateAction<FormatType>>;
	selectedPlan: PlanData | null;
	setSelectedPlan: Dispatch<SetStateAction<PlanData | null>>;
	selectedTimeSlots: ScheduleData[];
	setSelectedTimeSlots: Dispatch<SetStateAction<ScheduleData[]>>;
	currentPlans: PlanData[];
	currentSchedules: ScheduleData[];
	closeAllModals: () => void;
}

const MembershipSelectionContext =
	createContext<MembershipSelectionContextValue | null>(null);

export { SCHEDULES, SCHEDULES_BACKUP } from "../schedules";

interface PlansModalProps {
	children: React.ReactElement;
}

export const FORM_TITLE = "Choose Your Yoga Plan";
export const FORM_DESCRIPTION = "Flexible options for your wellness journey";

export function MembershipSelectionProvider({
	children,
	plans,
	onCloseAllModals,
}: {
	children: React.ReactNode;
	plans: PlansMap;
	onCloseAllModals: () => void;
}) {
	const [typeClass, setTypeClass] = useState<TypeClass>("hatha");
	const [classType, setClassType] = useState<ClassType>("virtual");
	const [formatType, setFormatType] = useState<FormatType>("group");
	const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
	const [selectedTimeSlots, setSelectedTimeSlots] = useState<ScheduleData[]>(
		[]
	);

	const currentPlans = plans[classType][formatType];
	const currentSchedules = SCHEDULES[typeClass][classType][formatType];

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
				selectedTimeSlots,
				setSelectedTimeSlots,
				currentPlans,
				currentSchedules,
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

export function MembershipModal({ plans }: { plans: PlansMap }) {
	const isMobile = useMediaQuery("max-md");
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const { trackEvent } = useTrackEvent();

	const handleOpenChange = useCallback(
		(nextOpen: boolean) => {
			setOpen(nextOpen);
			if (nextOpen) {
				trackEvent(ANALYTICS_EVENTS.bookingModalOpened, {
					source: getBookingSourceFromPathname(pathname),
					class_slug: getClassSlugFromPathname(pathname),
				});
			}
		},
		[pathname, trackEvent]
	);

	if (isMobile) {
		return (
			<MembershipSelectionProvider
				onCloseAllModals={() => setOpen(false)}
				plans={plans}
			>
				<Drawer
					handle={bookClassDrawerHandle}
					onOpenChange={handleOpenChange}
					open={open}
				>
					<DrawerPopup showBar>
						<DrawerHeader>
							<DrawerTitle>{FORM_TITLE}</DrawerTitle>
							<DrawerDescription>{FORM_DESCRIPTION}</DrawerDescription>
						</DrawerHeader>

						<DrawerPanel className="grid gap-4">
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
		<MembershipSelectionProvider
			onCloseAllModals={() => setOpen(false)}
			plans={plans}
		>
			<Dialog
				handle={bookClassDialogHandle}
				onOpenChange={handleOpenChange}
				open={open}
			>
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
