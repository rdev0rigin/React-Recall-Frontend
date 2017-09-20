import * as React from 'react';
import { RecallStore } from '../services/store.redux';
import {loadGapi} from '../services/gapi.service';
// import { actionSignIn } from '../main/app.actions';
// import { loadGapi } from '../services/gapi.service';
// import { transformGoogleDataToUserModel } from '../models/user.model';
// import { responseSocket } from '../services/socket-io.service';
declare var gapi: any;

export class SignInComponent extends React.Component {

	public state: {
		gapiReady: boolean;
	};

	constructor(
		public props: any
	) {
		super(props);
		this.signInUpHandler = this.signInUpHandler.bind(this);
		this.state = RecallStore.getState();
	}

	public componentDidMount(): void {
		if(!this.state.gapiReady){
			loadGapi().subscribe(loaded => {
				if(loaded) {
					this.setState(RecallStore.getState());
					this.props.history.push('/');
				}
			});
		}
	}

	public signInUpHandler(e: any): void {
		e.preventDefault();
		if(this.state.gapiReady){
			gapi.auth2
				.getAuthInstance()
				.signIn({
					prompt: 'consent',
					ux_mode: 'popup'
				})
				.then((profileInfo: any) => {
					console.log('response?');
					console.log('current user?', gapi.auth2.getAuthInstance().currentUser.get());
					console.log('profile?', profileInfo);
				})
				.catch((res: any) => console.log('auth error', res));
		}
	}

	render(){
		return(
			<div className={'sign-in-container'}>
				{this.state.gapiReady ? 'Ready!' : 'Not Ready'}
				<h1>Sign In</h1>
				<form>
					<button onClick={this.signInUpHandler}>Sign In With Google</button>
				</form>
			</div>
		)
	}
}