import * as React from 'react';
import {Link} from 'react-router-dom';
import {RecallStore} from '../services/store.redux';
import {editIcon} from '../assets/icons/edit';
import {stackIcon} from '../assets/icons/stack';
import {userIcon} from '../assets/icons/user';
import {playIcon} from '../assets/icons/play';
import {exitIcon} from '../assets/icons/exit';

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
			<div className='navbar-component'>
				{
					!this.props.signedIn
					?
						<Link to={'/sign-in'}>
							<NavButton
								label={'Sign In'}
							>
								{userIcon()}
							</NavButton>
						</Link>
						:
						<div
							onClick={this.signOutHandler}
						>
							<NavButton
								label={'Sign Out'}
							>
								{exitIcon()}
							</NavButton>
						</div>
					// : <button onClick={this.signOutHandler}>sign out</button>
				}
				<Link to={'/create-deck'}>
					<NavButton
						label={'Create A Deck'}
					>
						{editIcon()}
					</NavButton>
				</Link>
				<Link to={'/choose-deck'}>
					<NavButton
						label={'Choose A Deck'}
					>
						{stackIcon()}
					</NavButton>
				</Link>
				<Link to={'/recall'}>
					<NavButton
						label={'Start Game'}
					>
						{playIcon()}
					</NavButton>
				</Link>
			</div>
		);
	}
}

export const NavButton = (props: {
	label: string;
	children?: any;
}) => (
	<div className={'nav-button-container'}>
		{props.children}
		<div className={'label'}>
			{props.label}
		</div>
		{/*<div className={'bar'} />*/}
	</div>
);