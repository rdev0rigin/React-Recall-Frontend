
import {FlashCardDeck} from '../models/decks.model';

export const InitialState = {
	signedIn: false,
	user: null,
	gapiReady: false,
	decks: [],
	dataReady: false
};


export interface RecallState {
	dataReady: boolean;
	signedIn: boolean;
	user: {[key: string]: string};
	gapiReady: boolean;
	decks: FlashCardDeck[];
	[key: string]: any;
}
