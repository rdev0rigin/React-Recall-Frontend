import * as React from 'react';
import {NavbarComponent} from '../navbar/navbar.component';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {RecallStore} from '../services/store.redux';
import {RecallState} from './app.consts';
import {SignInComponent} from '../sign-in/sign-in.component';
import {loadGapi} from '../services/gapi.service';
import {SplashComponent} from './splash.component';
import {CreateDeckComponent} from '../decks/create-deck.component';
import {SelectDeckComponent} from '../decks/select-deck.component';

class App extends React.Component {
	public state: RecallState;
	constructor(
		public props: {[key: string]: any}
		) {
		super(props);
		this.state = RecallStore.getState();
	}

	public componentDidMount(): void {
		RecallStore.subscribe(()=> {
			console.log('store called from subscribed App!', RecallStore.getState());
			this.setState(RecallStore.getState());

		});
		loadGapi().subscribe(loaded => {
			if(loaded){
				this.setState(RecallStore.getState());
			}
		});
	}

	private mainLayout = (routes) => (
		<div className={'main-container'}>
			<div className={'top-toolbar'}>
				<NavbarComponent signedIn={this.state.signedIn} />
			</div>
			<div className={'center-row'}>
				{routes}
			</div>
		</div>
	);

	private routes = (props) => (
		<div className={'main-display'}>
			<Route
				exact
				path={'/'}
				render={() => {
					return <SplashComponent/>
					}
				}
			/>
			<Route
				path={'/sign-in'}
				component={SignInComponent}
			/>
			<Route
				path={'/choose-deck'}
				render={() => {
					return <SelectDeckComponent />
				}}
			/>
			<Route
				path={'/create-deck'}
				render={() => {
					return <CreateDeckComponent />
				}}
			/>
		</div>
	);

	render() {
		return (
			<BrowserRouter>
				{this.mainLayout(this.routes(this.state))}
			</BrowserRouter>
		);
	}
}

export default App;
