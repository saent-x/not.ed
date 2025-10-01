export function getInitials(name: string): string {
	const arr = name.toUpperCase().split(" ");

	return arr.length > 1 ? arr[0].at(0)! + arr[1].at(0) : arr[0].at(0)!;
}

export const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export function formatDate(date: Date): string {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const dayName = days[date.getDay()];
	const day = date.getDate();
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12 || 12;

	return `${dayName} ${day} ${year} at ${hours}:${minutes}${ampm}`;
}

export const mapToKey = <T>(arr: T[]): (T & { key: number })[] => {
	let counter = 0;
	return arr.map((item) => ({ ...item, key: counter++ }));
};

export const frequencyOptions = [
	{ label: "Daily", value: "daily" },
	{ label: "Weekly", value: "weekly" },
	{ label: "Monthly", value: "monthly" },
	{ label: "Yearly", value: "yearly" },
	{ label: "None", value: "none" },
	{ label: "Every Monday", value: "every monday" },
	{ label: "Every Tuesday", value: "every tuesday" },
	{ label: "Every Wednesday", value: "every wednesday" },
	{ label: "Every Thursday", value: "every thursday" },
	{ label: "Every Friday", value: "every friday" },
	{ label: "Every Saturday", value: "every saturday" },
	{ label: "Every Sunday", value: "every sunday" },
];
