import {Action} from '../services/store.redux';
import {InitialState} from './app.consts';

export const RecallReducer = (state = InitialState, action: Action) => {
	switch(action.type){
		case'USER_SIGNED_IN':
			return {...state, signedIn: true, user: action.user};
		case'USER_SIGNED_OUT':
			return {...state, signedIn: false, user: action.user};
		case'GAPI_LOADED':
			return {...state, gapiReady: true};
		case'USER_DECKS_FETCHED':
			return {...state, userDecksReady: true, userDecks: action.decks};
		case'ALL_DECKS_FETCHED':
			return {...state, userDecksReady: true, decks: action.decks};
		case'DECK_SELECTED':
			return {...state, currentDeck: action.deck, deckSelected: true};
		default:
			return state;
	}
};
