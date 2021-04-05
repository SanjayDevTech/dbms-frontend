export interface RoleStateType {
	email: string;
	hash: string;
	type: "user" | "seller";
	error: string | null;
}

export interface FormDataType {
	email: string;
	pwd: string;
	type: "user" | "seller";
	mode: "login" | "signup";
}

export default interface AuthStateType {
	user: RoleStateType;
	seller: RoleStateType;
}
