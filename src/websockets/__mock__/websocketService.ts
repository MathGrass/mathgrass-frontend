import {BehaviorSubject, Observable} from "rxjs";
import {ConnectionState, IWebsocketService} from "../websocketService";

// mock class implementation for WebsocketService for testing purposes
export class WebsocketService implements IWebsocketService {
    connect = jest.fn();
    send = jest.fn();
    subscribe = jest.fn();
    unsubscribe = jest.fn();
    onDestroy = jest.fn();
    disconnect = jest.fn();
    stompFailureCallback = jest.fn();
    enableReconnect = jest.fn();
    disableReconnect = jest.fn();

    // store callbacks
    private callbacks: { [channel: string]: (message: any) => void } = {};
    // connection state
    private connectionStateInternal: BehaviorSubject<ConnectionState> =
        new BehaviorSubject<ConnectionState>(new ConnectionState(false, false, true));

    // store callbacks for subscribed channels
    receive(channel: string): Observable<any> {
        return new Observable((subscriber) => {
            this.callbacks[channel] = (message: any) => {
                subscriber.next(message);
            };
        });
    }

    // simulate a message for a channel
    triggerMessageOnChannel(channel: string, message: any): void {
        if (this.callbacks[channel]) {
            this.callbacks[channel](message);
        } else {
            throw new Error(`No callback found for channel ${channel}`);
        }
    }

    get connectionState(): Observable<ConnectionState> {
        return this.connectionStateInternal.asObservable();
    }
}
