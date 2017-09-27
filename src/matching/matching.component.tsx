import * as React from 'react';
import {FlashCard, FlashCardDeck} from '../models/decks.model';
import {RecallStore} from '../services/store.redux';
import {crossIcon, trophyIcon} from '../assets/icons';

export interface MatchCard {
	id: string,
	text: string
}
export class MatchingComponent extends React.Component {
	public state: {
		dataReady: boolean;
		deckSelected: boolean;
		currentDeck: FlashCardDeck;
		selectedCards: FlashCard[];
		displayedCards: MatchCard[];
		cardHeld: boolean;
		selectedCardId: string;
		matchedCards: number;
		displayWin: boolean;

	};
	private matches: number = 0;

	constructor(public props){
		super(props);
		this.state = {
			dataReady: false,
			deckSelected: false,
			cardHeld: false,
			currentDeck: {} as FlashCardDeck,
			selectedCards: [],
			displayedCards: [],
			selectedCardId: '',
			matchedCards: 0,
			displayWin: false
		};

		this.playAgainHandler = this.playAgainHandler.bind(this);
	}

	public componentDidMount() {
		const state = RecallStore.getState();
		if(state.deckSelected){
			this.setState(
				{
					deckSelected: true,
				}
			);
			this.initializeMatchingGame();
		} else {
			this.setState({
				dataReady: true,
				deckSelected: false
			})
		}
	}

	private initializeMatchingGame(): void {
		this.setState({dataReady: false});
		const deck = RecallStore.getState().currentDeck;
		const cards = this.shuffleDeck(deck.cards);
		const matchCards = this.splitShuffleQuestionsAnswers(cards);
		for(let card of matchCards) {
			const cardRef = document.getElementById(card.id);
			if(cardRef){
				cardRef.className = cardRef.className.replace(' matched', '');
				cardRef.className = cardRef.className.replace(' held', '');
			}
		}
		this.setState({
			selectedCards: cards,
			displayedCards: matchCards,
			dataReady: true,
			matchedCards: 0
		});
	}

	private shuffleDeck(cards): FlashCard[] {
		let selectedCards: FlashCard[] = [];
		if(cards.length > 0){
			do {
				let index = Math
					.abs(Math //abs because negative numbers where being returned
						.floor(Math
							.random() * cards.length
						)
					);
				if (selectedCards.findIndex(card => card.id === cards[index].id) < 0 ) {
					selectedCards = [...selectedCards, cards[index]];
				}
			} while (selectedCards.length < cards.length);
		}
		return selectedCards;
	}

	private checkWin(): void {
		if(this.matches === this.state.selectedCards.length){
			let winModalRef = document.getElementById('Win-Modal');
			if(winModalRef) {
				winModalRef.style.display = 'block';
			}
		}
	}

	private splitShuffleQuestionsAnswers(cards: FlashCard[]): MatchCard[] {
		let shuffledDeck: MatchCard[] = [];
		let splitDeck: MatchCard[] = [];
		cards.forEach(card => splitDeck = [
			...splitDeck,
			{
				id: card.id + '.q', //attaching to differentiate between cards and allowing matching of (base) id
				text: card.question
			} as MatchCard,
			{
				id: card.id + '.a',
				text: card.answer
			} as MatchCard
			]
		);
		do {
			const index = Math
				.abs(Math
					.floor(Math
						.random() * splitDeck.length
					)
				);
			if (shuffledDeck.findIndex(card => card.text === splitDeck[index].text) < 0) {
				shuffledDeck = [...shuffledDeck, splitDeck[index]];
			}
		} while(shuffledDeck.length < splitDeck.length);
		return shuffledDeck;
	}

	private selectCardHandler(id: string) {
		console.log('selectCard hit', id);
		// if card is to be matched or held
		if(this.state.cardHeld) {
			const heldCardRef = document.getElementById(this.state.selectedCardId);
			const matchedCardRef = document.getElementById(id);
			// if card matches base id
			if(this.state.selectedCardId.split('.')[0] === id.split('.')[0]) {
				if(heldCardRef && matchedCardRef) {
					heldCardRef.className = heldCardRef.className.replace(' held', ' matched');
					matchedCardRef.className += ' matched';
					this.matches++
					this.setState({cardHeld: false, selectedCardId: '', matchedCards: this.state.matchedCards + 1});
					this.checkWin();
				}
			} else {
				if(heldCardRef){
					heldCardRef.className = heldCardRef.className.replace(' held', '');
					this.setState({cardHeld: false, selectedCardId: ''});
				}
			}
		} else {
			let cardRef = document.getElementById(id);
			if(cardRef){
				cardRef.className += ' held';
				this.setState({cardHeld: true, selectedCardId: id})
			}
		}
	}

	private playAgainHandler(): void {
		this.initializeMatchingGame();
		let winModalRef = document.getElementById('Win-Modal');
		if(winModalRef){
			winModalRef.style.display = 'none';
		}
	}

	private renderTable(){
		return <div
				className={'matching-table'}
			>
				{this.state.displayedCards
					.map(card =>
						<div
							className={'card'}
							key={card.id}
							id={card.id}
							onClick={() => this.selectCardHandler(card.id)}
						>
							<div
								className={'text'}
							>
								{card.text}
							</div>
						</div>
					)
				}
			</div>
	}

	public render(){
		if (this.state.deckSelected){
			return(
				<div
					className={'matching-component'}
				>
					{this.state.dataReady
						?
						this.renderTable()
						:
						<div>Loading Data . . . </div>
					}
					<WinModal
						message={'YOU WIN!'}
						clickHandler={this.playAgainHandler}
					/>
				</div>
			);

		} else {
			return(
				<div
					className={'no-deck'}
				>
					Please Select A Deck
				</div>
			);
		}
	}
}

export const WinModal = (props) =>
	<div
		className={'win-modal'}
		id={'Win-Modal'}
	>
		<div className={'message-container'}>
			<div className={'trophy-box'}>
				{trophyIcon()}
			</div>
			<div className={'text-box'}>
				{props.message}
			</div>
			<div
				className={'buttons-box'}
				onClick={props.clickHandler}
			>
				Play Again!
			</div>
			<div
				className={'close-container'}
				onClick={() => {
					const eleRef = document.getElementById('Win-Modal');
					if(eleRef){
						eleRef.style.display = 'none';
					}
				}}
			>
				{crossIcon()}
			</div>
		</div>
	</div>;