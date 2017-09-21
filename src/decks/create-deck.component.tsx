import * as React from 'react';
import {DeckListsComponent} from './deck-list.component';
import {TextInputComponent} from '../forms/text-input.component';
import {TextareaComponent} from '../forms/textarea.component';
import {RecallStore} from '../services/store.redux';
import {createDeck, getDecks} from '../services/decks.service';
import {FlashCardDeck} from '../models/decks.model';


const initialState = {
	dataReady: false,
	decks: [],
	currentDeck: {} as FlashCardDeck
};
export class CreateDeckComponent extends React.Component {
	public state: {
		dataReady: boolean;
		decks: FlashCardDeck[];
		currentDeck: FlashCardDeck;
	};

	constructor(
		public props,
	){
		super(props);
		this.deckTitleHandler = this.deckTitleHandler.bind(this);
		this.deckDescriptionHandler = this.deckDescriptionHandler.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
		this.deckSelectHandler = this.deckSelectHandler.bind(this);
		this.state = initialState;
	}

	public componentDidMount(): void {
		getDecks().subscribe(decks => {
			this.setState({
				decks: decks,
				currentDeck: decks[0],
				dataReady: true
			});
		})
	}

	private saveHandler(e): void {
		e.preventDefault();
		const user = RecallStore.getState().user;
		const deckData = {
			title: this.state.currentDeck.title,
			description: this.state.currentDeck.description,
			authorName: user.firstName + ' ' + user.lastName,
			authorId: user.id,
			cards: [
				...this.state.currentDeck.cards
			]
		};
		createDeck(deckData).subscribe(res => {
			console.log('saving deck', res);
		});
	}

	// private initializeNewCard(): void {
	//
	// }

	private deckTitleHandler(newValue): any {
		console.log(newValue);
		this.setState({
			currentDeck: {
				...this.state.currentDeck,
					title: newValue
			}
		});
	}

	private deckDescriptionHandler(newValue): any {
		console.log(newValue);
		// this.deckDescription = newValue;
	}

	public deckSelectHandler(id: string): void {
		const selectedDeck = this.state.decks.filter(deck => deck.id === id)[0];
		this.setState({currentDeck: selectedDeck});
		RecallStore.dispatch({type: 'DECK_SELECTED', deck: selectedDeck});
	}

	render(){
		return this.state.dataReady ?
			(
			<div className={'create-deck-component'}>
				<div className={'deck-list'}>
					<DeckListsComponent clickHandler={this.deckSelectHandler}/>
				</div>
				<div className={'editor'}>
					<button>Create A New Deck</button>
					<div className={'deck-editor'}>
						Deck Details
					<form className={'create-deck-form'}>
						<div className={'title-input'}>
							<h2>Title</h2>
							<TextInputComponent
								valueHandler = {this.deckTitleHandler}
								initialValue={this.state.currentDeck.title}
							/>
						</div>
						<div>
							<h2>Description</h2>
							<TextareaComponent
								valueHandler={this.deckDescriptionHandler}
								initialValue={this.state.currentDeck.description}
							/>
						</div>
					</form>
						<button>Add A Card</button>
						<ul>
							<li>
								{cardDetails({})}
							</li>
						</ul>
						<button onClick={this.saveHandler}>Save</button>
					</div>
				</div>
			</div>
			)
			:
			(
				<h1>Data Loading . . .</h1>
			)
	}
}

export function cardDetails(props): any {
	return (
		<div className={'card-details'}>
			CARD TEST
		</div>
	)
}