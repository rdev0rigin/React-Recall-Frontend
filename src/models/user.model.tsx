export interface UserModel {
	googleId: string;
	firstName: string;
	lastName: string;
	email: string;
}

export function transformGoogleDataToUserModel(GoogleData: any): UserModel {
	return {
		googleId: GoogleData.w3.Eea,
		firstName: GoogleData.w3.ofa,
		lastName: GoogleData.w3.wea,
		email: GoogleData.w3.U3
	};
}