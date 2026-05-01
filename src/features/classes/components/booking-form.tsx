"use client";

import { useState } from "react";

import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogCreateHandle,
	DialogDescription,
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
	DrawerHeader,
	DrawerPanel,
	DrawerPopup,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useMediaQuery } from "@/hooks/use-media-query";

import { useMembershipSelection } from "./booking-modal";

const LEAD_FORM_TITLE = "Almost there";
const LEAD_FORM_DESCRIPTION =
	"Share your details and we will contact you to finalize your booking.";
const leadCaptureDrawerHandle = DrawerCreateHandle();
const leadCaptureDialogHandle = DialogCreateHandle();

export function BookingFormModalTrigger() {
	const isMobile = useMediaQuery("max-md");
	const { selectedPlan, selectedTimeSlots } = useMembershipSelection();

	const isValid =
		selectedPlan &&
		selectedTimeSlots.length > 0 &&
		selectedTimeSlots.length <= selectedPlan.maxSlots;

	const triggerLabel = !selectedPlan
		? "Select a plan first"
		: selectedTimeSlots.length < selectedPlan.maxSlots
			? `Select ${selectedPlan.maxSlots} time slot${selectedPlan.maxSlots > 1 ? "s" : ""}`
			: "Continue Booking";

	if (isMobile) {
		return (
			<DrawerTrigger
				disabled={!isValid}
				handle={leadCaptureDrawerHandle}
				render={<Button className="px-6" type="button" />}
			>
				{triggerLabel}
			</DrawerTrigger>
		);
	}

	return (
		<DialogTrigger
			disabled={!isValid}
			handle={leadCaptureDialogHandle}
			render={<Button className="px-6" type="button" />}
		>
			{triggerLabel}
		</DialogTrigger>
	);
}

export function BookingFormModal() {
	const isMobile = useMediaQuery("max-md");
	const [open, setOpen] = useState(false);

	if (isMobile) {
		return (
			<Drawer
				handle={leadCaptureDrawerHandle}
				onOpenChange={setOpen}
				open={open}
			>
				<DrawerPopup showBar>
					<DrawerHeader>
						<DrawerTitle>{LEAD_FORM_TITLE}</DrawerTitle>
						<DrawerDescription>{LEAD_FORM_DESCRIPTION}</DrawerDescription>
					</DrawerHeader>
					<DrawerPanel className="grid gap-4">
						<BookingForm onSubmitted={() => setOpen(false)} />
					</DrawerPanel>
				</DrawerPopup>
			</Drawer>
		);
	}

	return (
		<Dialog handle={leadCaptureDialogHandle} onOpenChange={setOpen} open={open}>
			<DialogPopup>
				<DialogHeader className="border-b">
					<DialogTitle>{LEAD_FORM_TITLE}</DialogTitle>
					<DialogDescription>{LEAD_FORM_DESCRIPTION}</DialogDescription>
				</DialogHeader>
				<DialogPanel className="mt-4 grid gap-4">
					<BookingForm onSubmitted={() => setOpen(false)} />
				</DialogPanel>
			</DialogPopup>
		</Dialog>
	);
}

function BookingForm({ onSubmitted }: { onSubmitted: () => void }) {
	const {
		selectedPlan,
		selectedTimeSlots,
		classType,
		formatType,
		closeAllModals,
	} = useMembershipSelection();

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			notes: "",
		},
		onSubmit: async ({ value, formApi }) => {
			if (!selectedPlan || selectedTimeSlots.length === 0) {
				toast.error("Please select a plan and time slots before continuing.");
				return;
			}

			try {
				const response = await fetch("/api/class-booking-leads", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fullName: value.fullName,
						email: value.email,
						phone: value.phone,
						notes: value.notes,
						selectedPlan: {
							name: selectedPlan.name,
							classes: selectedPlan.classes,
							frequency: selectedPlan.frequency,
							price: selectedPlan.price,
							timeSlots: selectedTimeSlots,

							classType,
							formatType,
						},
					}),
				});

				if (!response.ok) {
					throw new Error("Failed to submit booking lead.");
				}

				toast.success("Booking request sent. We'll contact you shortly.");
				formApi.reset();
				onSubmitted();
				closeAllModals();
			} catch {
				toast.error("Could not submit your booking request. Please try again.");
			}
		},
	});

	if (!selectedPlan || selectedTimeSlots.length === 0) {
		return (
			<div className="py-6 text-center text-muted-foreground text-sm">
				Select a plan and time slots first to continue.
			</div>
		);
	}

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field
					name="fullName"
					validators={{
						onChange: ({ value }) =>
							value.trim().length < 2
								? "Please enter your full name"
								: undefined,
					}}
				>
					{(field) => {
						const hasError =
							field.state.meta.isTouched && field.state.meta.errors.length > 0;
						const errorMessage = hasError ? field.state.meta.errors[0] : null;

						return (
							<Field data-invalid={hasError || undefined}>
								<FieldLabel htmlFor={field.name}>Full name</FieldLabel>
								<Input
									aria-invalid={hasError || undefined}
									id={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="Your full name"
									value={field.state.value}
								/>
								<FieldError>
									{typeof errorMessage === "string" ? errorMessage : null}
								</FieldError>
							</Field>
						);
					}}
				</form.Field>

				<form.Field
					name="email"
					validators={{
						onChange: ({ value }) =>
							/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
								? undefined
								: "Please enter a valid email address",
					}}
				>
					{(field) => {
						const hasError =
							field.state.meta.isTouched && field.state.meta.errors.length > 0;
						const errorMessage = hasError ? field.state.meta.errors[0] : null;

						return (
							<Field data-invalid={hasError || undefined}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									aria-invalid={hasError || undefined}
									id={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="you@example.com"
									type="email"
									value={field.state.value}
								/>
								<FieldError>
									{typeof errorMessage === "string" ? errorMessage : null}
								</FieldError>
							</Field>
						);
					}}
				</form.Field>

				<form.Field
					name="phone"
					validators={{
						onChange: ({ value }) =>
							value.trim().length < 6
								? "Please enter a valid phone number"
								: undefined,
					}}
				>
					{(field) => {
						const hasError =
							field.state.meta.isTouched && field.state.meta.errors.length > 0;
						const errorMessage = hasError ? field.state.meta.errors[0] : null;

						return (
							<Field data-invalid={hasError || undefined}>
								<FieldLabel htmlFor={field.name}>Phone</FieldLabel>
								<Input
									aria-invalid={hasError || undefined}
									id={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="+971 ..."
									value={field.state.value}
								/>
								<FieldError>
									{typeof errorMessage === "string" ? errorMessage : null}
								</FieldError>
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="notes">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Notes (optional)</FieldLabel>
							<Textarea
								id={field.name}
								onBlur={field.handleBlur}
								onChange={(event) => field.handleChange(event.target.value)}
								placeholder="Any preferences or scheduling notes"
								value={field.state.value}
							/>
						</Field>
					)}
				</form.Field>
			</FieldGroup>

			<form.Subscribe selector={(state) => state.isSubmitting}>
				{(isSubmitting) => (
					<Button
						className="w-full"
						disabled={isSubmitting}
						size="lg"
						type="submit"
					>
						{isSubmitting && (
							<SpinnerGapIcon
								className="animate-spin"
								data-icon="inline-start"
							/>
						)}
						{isSubmitting ? "Submitting..." : "Submit Booking Request"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
