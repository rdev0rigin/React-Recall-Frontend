import * as React from 'react';
import {FlashCardDeck} from '../models/decks.model';
import {getDecks} from '../services/decks.service';
import {RecallStore} from '../services/store.redux';

interface state {
	decks: FlashCardDeck[];
	userDecks: FlashCardDeck[];
}

const initialState = {
	decks: [],
	userDecks: []
};

export class DeckListsComponent extends React.Component {
	public state: state;

	constructor(
		public props
	) {
		super(props);
		this.state = initialState;
	}

	public componentDidMount(): void {
		getDecks()
			.subscribe(decks => {
				if(RecallStore.getState().signedIn){
					const userDecks = this.filterDecksByUserId(RecallStore.getState().user.id, decks);
					this.setState({decks: decks, userDecks: userDecks});
				} else {
					this.setState({decks: decks, userDecks: []});
				}
				RecallStore.dispatch({type: 'ALL_DECKS_FETCHED', decks: decks});
		});
	}

	private filterDecksByUserId(userID: string, decks: FlashCardDeck[]){
		return decks.filter(deck => deck.authorId === userID);
	}

	render(): any {
		return (
			<div className={'deck-list-component'}>
				<h3>User Decks</h3>
				{decksList({decks: this.state.userDecks, handler: this.props.clickHandler})}
				<h3>All Decks</h3>
				{decksList({decks: this.state.decks, handler: this.props.clickHandler})}
			</div>
		)
	}
}

export function decksList(props){
	console.log('props', props);
	const decks = props.decks;
	const deckItems = decks.map(deck =>
		<li
			onClick={() => {
				props.handler(deck.id);
			}}
			className={'deck-item'}
			key={deck.id.toString()}
		>
			<div className={'deck-title'}>
				Title: {deck.title}
			</div>
			<p className={'deck-description'}>
				{deck.description}
			</p>
			<div className={'deck-footer'}>
				<div className={'deck-footer-author'}>
					made by: {deck.authorName}
				</div>
				<div className={'deck-footer-date'}>
					made on: {deck.createdOn}
				</div>
			</div>
		</li>
	);

	return (
		<ul className={'deck-list user-decks'}>
			{deckItems}
		</ul>
	)
}
