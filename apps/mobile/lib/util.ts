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

export function capitalize(word: string): string {
	if (!word) return "";
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const mapToKey = <T>(arr: T[]): (T & { key: number })[] => {
	let counter = 0;
	return arr.map((item) => ({ ...item, key: counter++ }));
};
