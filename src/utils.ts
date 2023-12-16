export function ensureError(value: unknown): Error {
	if (value instanceof Error) return value;

	let stringified = '[Unable to stringify the thrown value]';
	try {
		stringified = JSON.stringify(value);
	} catch {
		/* 에러에 대한 자세한 정보는 필요 없음 */
	}

	const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`);
	return error;
}
