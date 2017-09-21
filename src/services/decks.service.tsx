import {Observable} from 'rxjs-es';
import {FlashCardDeck} from '../models/decks.model';
import {responseSocket} from './socket-io.service';

export function createDeck(deckData: FlashCardDeck): Observable<FlashCardDeck> {
	console.log('create deck', deckData);
	return responseSocket('CREATE_DECK', {deckData: deckData});
}

export function getDecks(): Observable<FlashCardDeck[]> {
	return responseSocket('GET_DECKS');
}