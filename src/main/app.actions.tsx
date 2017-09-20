import {Action} from '../services/store.redux';

export const SignOut = 'USER_SIGNED_OUT';
export const SignIn = 'USER_SIGNED_IN';

export function actionSignIn(User: {name: string} = {name: 'foo'}): Action {
	return {type: SignIn, user: User};
}

export function actionSignOut(): Action {
	return {type: SignOut, user: null};
}