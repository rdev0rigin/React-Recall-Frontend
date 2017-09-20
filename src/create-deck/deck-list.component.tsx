import * as React from 'react';
import {DECKS, FlashCardDeck} from '../models/decks.model';

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
		const decks = this.getAllDecks();
		const userDecks = this.filterDecksByUserId('Rdev', decks);
		this.setState({decks: decks, userDecks: userDecks});

	}

	private filterDecksByUserId(userID: string, decks: FlashCardDeck[]){
		return decks.filter(deck => deck.meta.authorId === userID);
	}

	private getAllDecks(): FlashCardDeck[] {
		return DECKS('demo_array');
	}

	render(): any {
		return (
			<div className={'deck-list-component'}>
				<h3>User Decks</h3>
				{decksList({decks: this.state.userDecks})}
				<h3>All Decks</h3>
				{decksList({decks: this.state.decks})}
			</div>
		)
	}
}

export function decksList(props){
	console.log('props', props);
	const decks = props.decks;
	const deckItems = decks.map(deck =>
		<li className={'deck-item'} key={deck.meta.id.toString()}>
			<div className={'deck-title'}>
				Title: {deck.meta.title}
			</div>
			<p className={'deck-description'}>
				{deck.meta.description}
			</p>
			<div className={'deck-footer'}>
				<div className={'deck-footer-author'}>
					made by: {deck.meta.authorName}
				</div>
				<div className={'deck-footer-date'}>
					made on: {deck.meta.createdOn}
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
