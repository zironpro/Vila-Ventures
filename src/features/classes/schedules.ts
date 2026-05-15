export interface ScheduleData {
	id: string;
	day: string;
	time: string;
}

type TypeClass = "hatha" | "vinyasa flow" | "kids";
type ClassType = "virtual" | "physical";
type FormatType = "group" | "private";

export type SchedulesMap = Record<
	TypeClass,
	Record<ClassType, Record<FormatType, ScheduleData[]>>
>;

/** Previous schedule — restore by assigning to `SCHEDULES` if the client reverts. */
export const SCHEDULES_BACKUP: SchedulesMap = {
	hatha: {
		physical: {
			private: [
				{ id: "h-p-p-1", day: "Monday", time: "12:00 PM – 1:15 PM" },
				{ id: "h-p-p-2", day: "Tuesday", time: "12:00 PM – 1:15 PM" },
				{ id: "h-p-p-3", day: "Wednesday", time: "7:30 PM – 8:45 PM" },
				{ id: "h-p-p-4", day: "Thursday", time: "10:00 AM – 11:15 AM" },
				{ id: "h-p-p-5", day: "Friday", time: "12:00 PM – 1:15 PM" },
				{ id: "h-p-p-6", day: "Saturday", time: "12:00 PM – 1:15 PM" },
			],
			group: [],
		},
		virtual: {
			group: [
				{ id: "h-v-g-1", day: "Monday", time: "7:30 PM – 8:45 PM" },
				{ id: "h-v-g-2", day: "Tuesday", time: "10:00 AM – 11:15 AM" },
			],
			private: [],
		},
	},
	"vinyasa flow": {
		physical: {
			group: [
				{ id: "v-p-g-1", day: "Wednesday", time: "4:00 PM – 5:00 PM" },
				{ id: "v-p-g-2", day: "Saturday", time: "7:30 PM – 8:45 PM" },
			],
			private: [],
		},
		virtual: {
			group: [
				{ id: "v-v-g-1", day: "Tuesday", time: "4:00 PM – 5:00 PM" },
				{ id: "v-v-g-2", day: "Friday", time: "4:00 PM – 5:00 PM" },
				{ id: "v-v-g-3", day: "Thursday", time: "7:30 PM – 8:45 PM" },
			],
			private: [],
		},
	},
	kids: {
		physical: {
			group: [
				{ id: "k-p-g-1", day: "Monday", time: "4:00 PM – 5:00 PM" },
				{ id: "k-p-g-2", day: "Thursday", time: "4:00 PM – 5:00 PM" },
				{ id: "k-p-g-3", day: "Saturday", time: "4:00 PM – 5:00 PM" },
			],
			private: [
				{ id: "k-p-p-1", day: "Tuesday", time: "7:30 PM – 8:45 PM" },
				{ id: "k-p-p-2", day: "Friday", time: "7:30 PM – 8:45 PM" },
			],
		},
		virtual: {
			group: [],
			private: [],
		},
	},
};

/** Active schedule (client request May 2026): Hatha virtual group only. */
export const SCHEDULES: SchedulesMap = {
	hatha: {
		physical: {
			group: [],
			private: [],
		},
		virtual: {
			group: [
				{ id: "h-v-g-1", day: "Monday", time: "7:30 PM – 8:45 PM" },
				{ id: "h-v-g-2", day: "Tuesday", time: "10:00 AM – 11:15 AM" },
				{ id: "h-v-g-3", day: "Wednesday", time: "7:00 PM – 8:15 PM" },
			],
			private: [],
		},
	},
	"vinyasa flow": {
		physical: {
			group: [],
			private: [],
		},
		virtual: {
			group: [],
			private: [],
		},
	},
	kids: {
		physical: {
			group: [],
			private: [],
		},
		virtual: {
			group: [],
			private: [],
		},
	},
};
