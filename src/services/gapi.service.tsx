import {responseSocket} from './socket-io.service';
import {actionSignIn} from '../main/app.actions';
import {RecallStore} from './store.redux';
import {transformGoogleDataToUserModel} from '../models/user.model';
import {Observable} from 'rxjs-es';

export function loadGapi(): Observable<boolean> {
	return Observable.create(observer => {
		const script = document.createElement("script");
		script.src = "https://apis.google.com/js/client.js";
		script.onload = () => {
			gapi.load('client:auth2', () => {
				gapi.client.init({
					apiKey: 'AIzaSyDKQGo0Xi_b96zsUCrLvRh7RlqdTZ5w9Cw',
					clientId: '162979512478-2ds5qacogtsb0auqmj7vbfo612ch5dms.apps.googleusercontent.com',
					discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
					scope: 'profile'
				})
				.then((auth) => {
					RecallStore.dispatch({type: 'GAPI_LOADED'});
					gapi.auth2
						.getAuthInstance()
						.isSignedIn
						.listen(signInHandler);
					signInHandler(
						gapi.auth2
							.getAuthInstance()
							.isSignedIn
							.get()
					);
					observer.next(true);
					observer.complete();
				})
				.catch((res: any) => {
					console.log('error gapi', res);
					observer.error(false);
				});
		});
	};
	document.body.appendChild(script);
	});

}

function signInHandler(isSignedIn): void {
	if(isSignedIn){
		console.log('signin handler called');
		responseSocket(
			'USER_SIGNED_IN',
			{
				userData: transformGoogleDataToUserModel(
					gapi.auth2
						.getAuthInstance()
						.currentUser
						.get()
				)
			})
			.subscribe(res =>{
				RecallStore
					.dispatch(
						actionSignIn(res)
					);
			});
	}
}