import * as React from 'react';
import {CardsList, decksList} from './deck.consts';
import {RecallStore} from '../services/store.redux';
import {createDeck, getDecks, updateDeck} from '../services/decks.service';
import {FlashCardDeck, NewCard, NewDeck} from '../models/decks.model';

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
		this.cardQuestionHandler = this.cardQuestionHandler.bind(this);
		this.cardAnswerHandler = this.cardAnswerHandler.bind(this);
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
			})
	}

	private saveHandler(e): void {
		e.preventDefault();
		const user = RecallStore.getState().user;
		if(!!this.state.formData.id) {
			updateDeck(this.state.formData)
				.subscribe(deck => {
					console.log('update response', deck);
					this.setState({formData: deck})
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

	private cardQuestionHandler(event, index): any {
		const newValue = event.target.value;
			console.log('question value', newValue);
		let cards = this.state.formData.cards;
		cards[index] = Object.assign({}, cards[index], {question: newValue});
		this.setState(
			{
				formData: {
					...this.state.formData,
					cards: [
						...cards
					]
				}
			}
		);

	}

	private cardAnswerHandler(event, index): any {
		const newValue = event.target.value;
			console.log('question value', newValue);
		let cards = this.state.formData.cards;
		cards[index] = Object.assign({}, cards[index], {answer: newValue});
		this.setState(
			{
				formData: {
					...this.state.formData,
					cards: [
						...cards
					]
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


	private deckSelectHandler(id: string): void {
		this.setState({dataReady: false});
		const selectedDeck = Object.assign({}, this.state.decks
			.filter(deck => deck.id === id)[0]);
		this.setState(
			{
				currentDeck: selectedDeck,
				formData: selectedDeck
			}
		);
		console.log('selected deck', selectedDeck);
		RecallStore.dispatch({type: 'DECK_SELECTED', deck: selectedDeck});
		this.setState({dataReady: true});
	}

	render(){
		return this.state.dataReady
			?
				(
					<div className={'create-deck-component'}>
						<div className={'create-deck-list'}>
							<strong>Decks</strong>
							{ decksList(
								{
									decks: this.state.decks,
									handler: this.deckSelectHandler
								})
							}
						</div>
						<div className={'editor'}>
							<button onClick={() => this.initializeFormData(NewDeck())}>Create A New Deck</button>
							<div className={'deck-editor'}>
								{DeckForm(
									{
										title: this.state.formData.title,
										description: this.state.formData.description,
										deckTitleHandler: this.deckTitleHandler,
										deckDescriptionHandler: this.deckDescriptionHandler
									}
								)}
								<button onClick={this.addNewCard}>Add A Card</button>
								{CardsList(
									{
										questionHandler: this.cardQuestionHandler,
										answerHandler: this.cardAnswerHandler,
										cards: this.state.formData.cards
									}
								)}
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

export const DeckForm = (props): any =>
	<div className={'create-deck-form'}>
		<div className={'title-input'}>
			<h2>Title</h2>
			<input className={'deck-title-input'}
				onChange={props.deckTitleHandler}
				value={props.title}
			/>
		</div>
		<div>
			<h2>Description</h2>
			<textarea className={'description-textarea'}
				onChange={props.deckDescriptionHandler}
				value={props.description}
			/>
		</div>
	</div>
;
