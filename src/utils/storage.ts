export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState) {
			return JSON.parse(serializedState);
		}
	} catch (e) {
		console.log(e);
	}
	return undefined;
};

export const saveState = (state: any) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("state", serializedState);
	} catch (e) {
		console.log(e);
	}
};
