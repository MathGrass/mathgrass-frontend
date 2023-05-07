import {ConnectionState, WebsocketService} from './websocketService';
import SockJS from 'sockjs-client';
import * as Webstomp from 'webstomp-client';
import {Client, Message, Subscription as StompSubscription} from 'webstomp-client';
import {Observable, Subscriber, Subscription} from "rxjs";

// setup mocks to mock websocket server
jest.mock('sockjs-client');
jest.mock('webstomp-client');

const mockStompClient = {
    debug: jest.fn(),
    connect: jest.fn(),
    subscribe: jest.fn(),
};

// websocket service class extension for making websocket service methods testable
class TestableWebsocketService extends WebsocketService {
    setStompClientConnectedStatus(connected: boolean | null): void {
        // @ts-ignore
        this.stompClient = { connected };
    }

    setObservables(observables: Map<string, Observable<Message>>) {
        // @ts-ignore
        this.observables = observables;
    }

    getObservables(): Map<string, Observable<any>> {
        // @ts-ignore
        return this.observables;
    }

    getStompSubscriptions(): Map<string, Webstomp.Subscription> {
        // @ts-ignore
        return this.stompSubscriptions;
    }

    setStompSubscriptions(subscriptions: Map<string, Webstomp.Subscription>) {
        // @ts-ignore
        this.stompSubscriptions = subscriptions;
    }

    getSubscribers(): Map<string, Subscriber<any>> {
        // @ts-ignore
        return this.subscribers;
    }

    setSubscribers(subscriptions: Map<string, Subscriber<any>>) {
        // @ts-ignore
        this.subscribers = subscriptions;
    }

    setWaitUntilConnectionSubscriptions(subscriptions: Subscription[]) {
        // @ts-ignore
        this.waitUntilConnectionSubscriptions = subscriptions;
    }

    setConnectionStateInternal(connected: boolean, wasConnectedBefore: boolean, intendedDisconnect: boolean) {
        // @ts-ignore
        this.connectionStateInternal.next(new ConnectionState(connected, wasConnectedBefore, intendedDisconnect));
    }

    setStompClient(stompClient: Webstomp.Client) {
        // @ts-ignore
        this.stompClient = stompClient;
    }

    getWaitUntilConnectionSubscriptions(): Map<string, Subscription> {
        // @ts-ignore
        return this.waitUntilConnectionSubscriptions;
    }
}

describe('WebsocketService', () => {
    let websocketService: WebsocketService;

    beforeEach(() => {
        // @ts-ignore
        (SockJS as jest.Mock).mockClear();
        (Webstomp.over as jest.Mock).mockClear();
        (Webstomp.over as jest.Mock).mockReturnValue(mockStompClient);

        websocketService = new WebsocketService();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should create websocket service instance', () => {
        expect(websocketService).toBeDefined();
    });

    it('should connect to websocket server', () => {
        websocketService.connect();

        // check that necessary calls have been made
        expect(SockJS).toHaveBeenCalledTimes(1);
        expect(Webstomp.over).toHaveBeenCalledTimes(1);
        expect((Webstomp.over as jest.Mock).mock.calls[0][1]).toHaveProperty('heartbeat');
        expect((Webstomp.over as jest.Mock).mock.calls[0][1]).toHaveProperty('debug');
        expect((Webstomp.over as jest.Mock).mock.calls[0][1]).toHaveProperty('protocols');
    });

    it('should return correct connection state', () => {
        const testableWebsocketService = new TestableWebsocketService(/* pass required dependencies */);

        // test when stompClient is connected
        testableWebsocketService.setStompClientConnectedStatus(true);
        expect(testableWebsocketService.isConnected()).toBe(true);

        // test when stompClient is disconnected
        testableWebsocketService.setStompClientConnectedStatus(false);
        expect(testableWebsocketService.isConnected()).toBe(false);

        // test when stompClient is not defined (null or undefined)
        testableWebsocketService.setStompClientConnectedStatus(null);
        expect(testableWebsocketService.isConnected()).toBe(false);
    });

    it('disconnect should properly disconnect and clean up', () => {
        // set up websocket service
        const testableWebsocketService = new TestableWebsocketService();

        // set up mocks and spies
        const disconnectSpy = jest.fn();

        const mockObservable = new Observable<Message>();
        const mockSubscription = new Subscription();
        mockSubscription.unsubscribe = jest.fn();
        jest.spyOn(mockObservable, 'subscribe').mockImplementation(() => mockSubscription);

        const mockChannelMap = new Map<string, Observable<Message>>();
        mockChannelMap.set('test-channel', mockObservable);
        testableWebsocketService.setObservables(mockChannelMap);

        const mockConnectionSubscription = new Subscription();
        mockConnectionSubscription.unsubscribe = jest.fn();
        testableWebsocketService.setWaitUntilConnectionSubscriptions([mockConnectionSubscription]);

        // @ts-ignore
        // set initial connection state and set disconnect spy
        testableWebsocketService.stompClient = { disconnect: disconnectSpy };
        testableWebsocketService.setConnectionStateInternal(true, true, false);

        // call disconnect
        testableWebsocketService.disconnect();

        // should have unsubscribed from all observables
        expect(mockConnectionSubscription.unsubscribe).toHaveBeenCalled();

        // stomp client should not exist anymore
        // @ts-ignore
        expect(testableWebsocketService.stompClient).toBeUndefined();
        // connection state should be correct
        // @ts-ignore
        expect(testableWebsocketService.connectionStateInternal.getValue()).toEqual({
            connected: false,
            intendedDisconnect: true,
            wasEverConnectedBefore: false
        });
    });

    it('enableReconnect should set shouldReconnect to true and call connect if stompClient is not connected', () => {
        // set up service and spy on connection
        const testableWebsocketService = new TestableWebsocketService();
        const connectSpy = jest.spyOn(testableWebsocketService, 'connect');

        // enable reconnect
        // @ts-ignore
        testableWebsocketService.stompClient = { connected: false };
        testableWebsocketService.enableReconnect();

        // check that connect was called and shouldReconnect is true
        expect(connectSpy).toHaveBeenCalled();
        // @ts-ignore
        expect(testableWebsocketService.shouldReconnect).toBe(true);
    });

    it('enableReconnect should set shouldReconnect to true and not call connect if stompClient is connected', () => {
        // set up service and spy on connection
        const testableWebsocketService = new TestableWebsocketService();
        const connectSpy = jest.spyOn(testableWebsocketService, 'connect');

        // enable reconnect
        // @ts-ignore
        testableWebsocketService.stompClient = { connected: true };
        testableWebsocketService.enableReconnect();

        // check that connect was not called and shouldReconnect is true
        expect(connectSpy).not.toHaveBeenCalled();
        // @ts-ignore
        expect(testableWebsocketService.shouldReconnect).toBe(true);
    });

    it('disableReconnect should set shouldReconnect to false', () => {
        // set up service
        const testableWebsocketService = new TestableWebsocketService();

        // disable reconnect
        testableWebsocketService.disableReconnect();

        // check that shouldReconnect is false
        // @ts-ignore
        expect(testableWebsocketService.shouldReconnect).toBe(false);
    });

    it('onDestroy should call disconnect', () => {
        // set up service and spy on disconnect
        const testableWebsocketService = new TestableWebsocketService();
        const disconnectSpy = jest.spyOn(testableWebsocketService, 'disconnect');

        // call onDestroy
        testableWebsocketService.onDestroy();

        // check that disconnect was called
        expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should create a new observable for the channel if it does not exist', () => {
        // set up service and observable
        const testableWebsocketService = new TestableWebsocketService();
        const channel = '/test-channel';
        const observable = testableWebsocketService.receive(channel);

        // check that received observable is of correct type
        expect(observable).toBeInstanceOf(Observable);

        // check that channel stored in observables
        expect(testableWebsocketService.getObservables().has(channel)).toBe(true);
    });

    it('should return an existing observable for the channel if it exists', () => {
        // set up service and observable
        const testableWebsocketService = new TestableWebsocketService();
        const channel = '/test-channel';
        const existingObservable = new Observable<Message>();

        // set observable in service
        testableWebsocketService.setObservables(new Map([[channel, existingObservable]]));

        // receive observable
        const observable = testableWebsocketService.receive(channel);

        // check that observable is the same as the existing one
        expect(observable).toEqual(existingObservable);
    });

    it('should send data through the websocket connection if connected', () => {
        // set up service and message to send
        const testableWebsocketService = new TestableWebsocketService();
        const path = '/test-path';
        const data = { key: 'value' };

        // mock connected stomp client
        let mockStompClient: Partial<Client>
        mockStompClient = {
            send: jest.fn(),
            connected: true,
        };
        testableWebsocketService.setStompClient(mockStompClient as Client);

        // send data
        testableWebsocketService.send(path, data);

        // send should have been called
        expect(mockStompClient.send).toHaveBeenCalledWith(path, JSON.stringify(data), {});
    });

    it('subscribe should add observable and set waitUntilConnectionSubscriptions', () => {
        // set up service and channel
        const testableWebsocketService = new TestableWebsocketService();
        const channel = '/test-channel';

        // set connection state
        testableWebsocketService.setConnectionStateInternal(true, true, false);

        // call subscribe
        testableWebsocketService.subscribe(channel);

        // check that observable was added
        expect(testableWebsocketService.getObservables().has(channel)).toBe(true);

        // check that waitUntilConnectionSubscriptions was set
        expect(testableWebsocketService.getWaitUntilConnectionSubscriptions().has(channel)).toBe(true);
    });

    it('unsubscribe should remove all observables', () => {
        // set up service and initial subscriptions
        const testableWebsocketService = new TestableWebsocketService();
        const channel = '/test-channel';
        const mockSubscriber = new Subscriber();
        const mockSubscription: StompSubscription = {
            id: 'test-id',
            unsubscribe: jest.fn(),
        }

        // set observables and subscriptions
        testableWebsocketService.setObservables(new Map([[channel, new Observable<Message>()]]));
        testableWebsocketService.setSubscribers(new Map([[channel, mockSubscriber]]));
        testableWebsocketService.setStompSubscriptions(new Map([[channel, mockSubscription]]));

        // call unsubscribe
        testableWebsocketService.unsubscribe(channel);

        // check that stomp subscription called unsubscribe
        expect(mockSubscription.unsubscribe).toHaveBeenCalled();

        // check that maps are empty
        expect(testableWebsocketService.getObservables().size).toBe(0);
        expect(testableWebsocketService.getSubscribers().size).toBe(0);
        expect(testableWebsocketService.getStompSubscriptions().size).toBe(0);
    });
});
