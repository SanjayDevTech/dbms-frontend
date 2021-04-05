export default interface MessagePropsI {
	open: boolean;
	closeHandler: (e: any, reason?: string) => void;
	msg: string | null;
}
