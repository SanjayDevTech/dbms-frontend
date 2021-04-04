export interface RoleStateType {
	email: string;
	hash: string;
	type: string;
	error?: string;
}

export interface FormDataType {
	email: string;
	pwd: string;
	type: string;
}

export default interface AuthStateType {
	user: RoleStateType;
	seller: RoleStateType;
}
