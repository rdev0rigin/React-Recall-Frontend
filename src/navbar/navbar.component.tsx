import * as React from 'react';
import {Link} from 'react-router-dom';
import {RecallStore} from '../services/store.redux';
import {
	editIcon, exitIcon, flashIcon, matchIcon, multipleChoiceIcon, stackIcon,
	userIcon
} from '../assets/icons';

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
						label={'Create/Edit Deck'}
					>
						{editIcon()}
					</NavButton>
				</Link>
				<Link to={'/choose-deck'}>
					<NavButton
						label={'Select Deck'}
					>
						{stackIcon()}
					</NavButton>
				</Link>
				<Link to={'/flash-cards'}>
					<NavButton
						label={'Flash Cards'}
					>
						{flashIcon()}
					</NavButton>
				</Link>
				<Link to={'/matching'}>
					<NavButton
						label={'Matching'}
					>
						{matchIcon()}
					</NavButton>
				</Link>
				<Link to={'/multiple-choice'}>
					<NavButton
						label={'Multiple Choice'}
					>
						{multipleChoiceIcon()}
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