import * as React from 'react';
import {DeckListsComponent} from './deck-list.component';
import {TextInputComponent} from '../forms/text-input.component';
import {TextareaComponent} from '../forms/textarea.component';

export class CreateDeckComponent extends React.Component {
	private deckTitle: string = '';
	private deckDescription: string = '';

	constructor(
		public props,
	){
		super(props);
		this.deckTitleHandler = this.deckTitleHandler.bind(this);
		this.deckDescriptionHandler = this.deckDescriptionHandler.bind(this);
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
	private deckDescriptionHandler(newValue): any {
		console.log(newValue);
		this.deckDescription = newValue;
	}

	render(){
		return (
			<div className={'create-deck-component'}>
				<div className={'deck-list'}>
					<DeckListsComponent/>
				</div>
				<div className={'editor'}>
					<button>Create A New Deck</button>
					<div className={'deck-editor'}>
						Deck Details
					<form className={'create-deck-form'}>
						<div className={'title-input'}>
							<strong>Title</strong>
							<TextInputComponent
								valueHandler = {this.deckTitleHandler}
								initialValue={'Initial Value'}
							/>
						</div>
						<div>
							<strong>Description</strong>
							<TextareaComponent
								valueHandler={this.deckDescriptionHandler}
								initialValue={'Initial value'}
							/>
						</div>
					</form>
						<button>Add A Card</button>
						<ul>
							<li>
								{cardDetails()}
							</li>
						</ul>
						<button onClick={this.saveHandler}>Save</button>
					</div>
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

