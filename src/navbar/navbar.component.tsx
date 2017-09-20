import * as React from 'react';
import {Link} from 'react-router-dom';
import {responseSocket} from '../services/socket-io.service';
import {RecallStore} from '../services/store.redux';

export interface NavbarProps {
	signedIn: boolean
}

export class NavbarComponent extends React.Component {

	constructor(
		public props: NavbarProps
	){
		super(props);
	}

	public componentDidMount(): void {
	}



	public signOutHandler(e: any): void {
		e.preventDefault();
		gapi.auth2.getAuthInstance().signOut();
		RecallStore.dispatch({type: 'USER_SIGNED_OUT', user: null});
	}

	render(): any {
		return(
			<div className='navbar-container'>
					{
						!this.props.signedIn
						? <Link to={'/sign-in'}><button>Sign In/Up</button></Link>
						: <button onClick={this.signOutHandler}>sign out</button>
					}
					<Link to={'/create-deck'}>
						<button>Create A Deck</button>
					</Link>
					<Link to={'/choose-deck'}>
						<button>Pick A Deck</button>
					</Link>
					<Link to={'/recall'}>
						<button>Start Game</button>
					</Link>
					<button onClick={(e) => {
						e.preventDefault();
						responseSocket('TEST',{}).subscribe(res => {
							console.log(res);
						});
					}}>Test Sockets</button>
			</div>
		);
	}
}