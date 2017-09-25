import * as React from 'react';
import {FlashCardDeck} from '../models/decks.model';
import {getDecks} from '../services/decks.service';
import {Subscription} from 'rxjs-es';
import {RecallStore} from '../services/store.redux';
import {CardsList, DecksList} from './deck.consts';

interface SelectDeckState {
	dataReady: boolean;
	showSelection: boolean;
	showDetails: boolean;
	deckSelected: boolean;
	decks: FlashCardDeck[];
	currentDeck: FlashCardDeck;
}

const InitialState = {
	showSelection: true,
	showDetails: false,
	deckSelected: false,
	decks: [],
	dataReady: false,
	currentDeck: {
		cards: [{
			question: 'Demo Card Question',
			answer: 'Demo Card Answer'
		}],
		title: 'Demo Deck',
		description: 'Demo Deck',
	}

};

export class SelectDeckComponent extends React.Component {
	public state: SelectDeckState;
	private subscriptions: Subscription;

	constructor(public props){
		super(props);
		this.state = InitialState;
		this.subscriptions = getDecks()
			.subscribe(decks => {
				RecallStore.dispatch({ type: 'ALL_DECKS_FETCHED', decks: decks});
				this.setState({ decks: decks, dataReady: true});
		});
		this.deckSelectHandler = this.deckSelectHandler.bind(this);
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	private deckSelectHandler(deckId: string): void {
		const decks = RecallStore.getState().decks;
		const selectedDeck = decks.filter(deck => deck.id === deckId)[0];
		let itemRef = document.getElementById(deckId);
		if (this.state.currentDeck && this.state.currentDeck.id) {
			let lastSelectRef = document.getElementById(this.state.currentDeck.id);
			if(lastSelectRef) {
				lastSelectRef.className = lastSelectRef.className.replace(' active', '');
			}
		}
		if(itemRef) {
			itemRef.className += ' active';
		}
		RecallStore.dispatch({type: 'DECK_SELECTED', deck: selectedDeck});
		this.setState({currentDeck: selectedDeck, deckSelected: true})
	}

	private renderCardsList(cards): any {
		return (
			<CardsList cards={cards}/>
		);
	}

	render(){
		return this.state.dataReady ? (
			<div className={'select-deck-component'}>
				{DecksList({decks: this.state.decks, handler: this.deckSelectHandler})}
				{this.state.deckSelected ? this.renderCardsList(this.state.currentDeck.cards) : ''}
			</div>
		) : (
			<div> Data Loading .......</div>
		);
}

}