import * as React from 'react';
import {DecksList} from './deck.consts';
import {RecallStore} from '../services/store.redux';
import {createDeck, getDecks, updateDeck} from '../services/decks.service';
import {FlashCardDeck, NewCard, NewDeck} from '../models/decks.model';
import {EditableCardComponent} from './editable-card.component';
import {EditableDeckComponent} from './editable-deck.component';
import {plusIcon} from '../assets/icons/plus';

const initialState = {
	dataReady: false,
	decks: [],
	currentDeck: {} as FlashCardDeck,
	formData: NewDeck()
};

export class CreateDeckComponent extends React.Component {
	public state: {
		dataReady: boolean;
		decks: FlashCardDeck[];
		currentDeck: FlashCardDeck;
		formData: FlashCardDeck;
	};

	constructor(
		public props,
	){
		super(props);
		this.deckTitleHandler = this.deckTitleHandler.bind(this);
		this.deckDescriptionHandler = this.deckDescriptionHandler.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
		this.deckSelectHandler = this.deckSelectHandler.bind(this);
		this.addNewCard = this.addNewCard.bind(this);
		this.cardValueHandler = this.cardValueHandler.bind(this);
		this.deckHandler = this.deckHandler.bind(this);
		this.state = initialState;
	}

	public componentDidMount(): void {
		getDecks().subscribe(decks => {
			this.setState({
				decks: decks,
				currentDeck: decks[0],
				dataReady: true,
			});
		});
		this.initializeFormData();
	}

	public initializeFormData(props = NewDeck()): void {
		this.setState({formData: props});
	}

	private addNewCard(): void {
		this.setState(
			{
				formData: {
					...this.state.formData,
					cards: [
						...this.state.formData.cards,
						NewCard
					]
				}
			}
		);
	}

	private saveHandler(e): void {
		e.preventDefault();
		const user = RecallStore.getState().user;
		if(!!this.state.formData.id) {
			updateDeck(this.state.formData)
				.subscribe(deck => {

					// Inserting new deck into the states decks and updating formData with saved values
					let updatedDecks = this.state.decks;
					updatedDecks[this.state.decks.findIndex(obj => obj.id === deck.id)] = deck;
					this.setState({formData: deck, decks: updatedDecks});
				})
		} else {
			const newDeckData = {
				title: this.state.formData.title,
				description: this.state.formData.description,
				authorName: user.firstName + ' ' + user.lastName,
				authorId: user.id,
				cards: this.state.formData.cards
			};

			createDeck(newDeckData).subscribe(deck => {
				console.log('new deck', deck);
				this.setState({formData: deck})
			});
		}
	}

	private cardValueHandler(newCard): any {
		this.setState({formData: {
			...this.state.formData,
			cards:
				this.state.formData.cards.map(card => {
					if(card.id !== newCard.id){
						return card;
					} else {
						return newCard;
					}
				})
		}})
	};

	private deckHandler(value: {title: string, description: string}): any {
		console.log('new value', value, this.state.formData);
		this.setState({
			formData: {
				...this.state.formData,
				...value
			}
		});
	}

	private deckTitleHandler(event): any {
		const newValue = event.target.value;
		this.setState(
			{
				formData: {
					...this.state.formData,
					title: newValue
				}
			}
		);
	}

	private deckDescriptionHandler(event): any {
		const newValue = event.target.value;
		console.log('formData', {...this.state.formData});
		this.setState(
			{
				formData: {
					...this.state.formData,
					description: newValue
				}
			}
		);
	}


	private deckSelectHandler(deckId: string): void {
		this.setState({dataReady: false});
		const selectedDeck = Object.assign({}, this.state.decks
			.filter(deck => deck.id === deckId)[0]);
		if(this.state.currentDeck && this.state.currentDeck.id) {
			let previousDeckRef = document.getElementById(this.state.currentDeck.id);
			if (previousDeckRef) {
				previousDeckRef.className = previousDeckRef.className.replace(' active', '');
			}
		}
		if(selectedDeck.id){
			let selectedDeckRef = document.getElementById(selectedDeck.id);
			if(selectedDeckRef) {
				selectedDeckRef.className += ' active';
			}
		}
		RecallStore.dispatch({type: 'DECK_SELECTED', deck: selectedDeck});
		this.setState({currentDeck: selectedDeck, formData: selectedDeck, dataReady: true});
	}

	render(){
		return this.state.dataReady
			?
				(
					<div className={'create-deck-component'}>
						<div className={'create-deck-list'}>
							<strong>Decks</strong>
							<button
								className={'add'}
								onClick={() => this.initializeFormData(NewDeck())}>
								{plusIcon()}
							</button>
							{ DecksList(
								{
									decks: this.state.decks,
									handler: this.deckSelectHandler
								})
							}
						</div>
						<div className={'editor'}>

							<div className={'deck-editor'}>
								<div
									className={'title'}>
									DECK DETAILS
								</div>
								<EditableDeckComponent
									title={this.state.formData.title}
									description={this.state.formData.description}
									deckHandler={this.deckHandler}
								/>
								<div className={'cards-list'}>
								<button
									className={'add'}
									onClick={this.addNewCard}>
									{plusIcon()}
								</button>
									<div
										className={'title'}
									>
										CARD DETAILS
									</div>
									{this.state.formData.cards.map(card => {
										return (
											<div
												className={'card-item'}
												key={Math.random().toString()}
											>
												<EditableCardComponent
													card={card}
													cardValueHandler={this.cardValueHandler}
												/>
											</div>
										)
									})}
								</div>
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