// Ex: 2 days ago / today
export function formatDateRelative(targetDate: Date): string {
	const now = new Date()
	const diffInSeconds = (targetDate.getTime() - now.getTime()) / 1000

	const secondsPerDay = 60 * 60 * 24
	let daysDiff = Math.abs(Math.round(diffInSeconds / secondsPerDay))

	let message: string
	if (diffInSeconds < 0) {
		// Past date
		message = `${daysDiff} days ago`
	} else {
		// Future date
		message = `in ${daysDiff} days`
	}

	// Special cases for today and tomorrow/yesterday
	if (daysDiff === 0) {
		message = "Today"
	} else if (daysDiff === 1) {
		message = diffInSeconds < 0 ? "Yesterday" : "Tomorrow"
	}

	return message
}
