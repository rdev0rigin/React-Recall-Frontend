import * as IO from 'socket.io-client';
import {Observable} from 'rxjs-es';
const io = IO('localhost:2729');

export function responseSocket(eventPath: string, payload?: {}): Observable<any> {
	return Observable.create((observer: any) => {
		io.emit(eventPath, payload);
		io.on(eventPath + '.response', (response: {} ) => {
			observer.next(response);
			observer.complete();
			observer.error('There was an error with socket service.');
		});
	});
}