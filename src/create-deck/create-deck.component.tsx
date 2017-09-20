import * as React from 'react';
import {DeckListsComponent} from './deck-list.component';
import {TextInputComponent} from '../forms/text-input.component';

export class CreateDeckComponent extends React.Component {
	private deckTitle: string = '';

	constructor(
		public props,
	){
		super(props);
		this.deckTitleHandler = this.deckTitleHandler.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
	}

	private saveCard(cardData: any): void {
		console.log('Card should save: ', cardData);
	}

	private saveDeck(deckData: any): void {
		console.log('Deck should save: ', deckData);
	}

	private saveHandler(e): void {
		e.preventDefault();
		this.saveCard(this.deckTitle);
		this.saveDeck(this.deckTitle);
	}

	private deckTitleHandler(newValue): any {
		console.log(newValue);
		this.deckTitle = newValue;
	}

	render(){
		return (
			<div>
				<h3>Pick a Deck to Edit</h3>
				<div className={'deck-list'}>
					<DeckListsComponent/>
				</div>
				or
				<button>Create A New Deck</button>
				<div className={'deck-editor'}>
					Deck Details
				<form>
					<label>Title</label>
					<TextInputComponent
						valueHandler = {this.deckTitleHandler}
						initialValue={'Initial Value'}
					/>
					<label>Description</label>
					<textarea></textarea>
					<button>Add A Card</button>
					<ul>
						<li>
							{cardDetails()}
						</li>
					</ul>
					<button onClick={this.saveHandler}>Save</button>
				</form>
				</div>
			</div>
		)
	}
}

export function cardDetails(): any {
	return (
		<div className={'card-details'}>
			CARD TEST
		</div>
	)
}

