import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import Assessment, {getWebsocketChannelForTaskResultId} from './assessment';
import websocketService from '../../websockets/websocketService';
import {WebsocketService} from '../../websockets/websocketService';
import {GraphDTO, QuestionDTO, TaskDTO} from "../../src-gen/mathgrass-api";
import userEvent from "@testing-library/user-event";
import {store} from "../../state/common/store";
import {propagateCurrentAssessmentResponse, resetStore, setCurrentTask} from "../../state/applicationState";
import {act} from "react-dom/test-utils";
import {Observable} from "rxjs";

// make connect and onDestroy methods of the websocket service do nothing
jest.spyOn(WebsocketService.prototype, 'connect').mockImplementation(() => {});
jest.spyOn(WebsocketService.prototype, 'onDestroy').mockImplementation(() => {});

// create spies for the other necessary functions of the websocket service
const sendSpy = jest.spyOn(WebsocketService.prototype, 'send');
const subscribeSpy = jest.spyOn(WebsocketService.prototype, 'subscribe');
let receiveSpy = jest.spyOn(WebsocketService.prototype, 'receive');
const unsubscribeSpy = jest.spyOn(WebsocketService.prototype, 'unsubscribe');

// set up sample question and graph for task
const sampleQuestion: QuestionDTO = {
    question: 'What is 2 + 2?',
}

const sampleGraph: GraphDTO = {
    id: 1,
    edges: [],
    vertices: []
}

// set up sample task
const sampleTask: TaskDTO = {
    id: 1,
    graph: sampleGraph,
    question: sampleQuestion,
};

function submitFormWithInput() {
    // insert answer
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, '4');

    // get button
    const submitButton = screen.getByTestId('submitAnswerButton');
    userEvent.click(submitButton);
}

describe('Assessment Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
        store.dispatch(resetStore())
    });

    it('renders without crashing and shows question', () => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        // check if question is shown
        expect(screen.getByText(sampleQuestion.question)).toBeInTheDocument();
    });

    it('submit form shows spinner', async () => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        // render component with real store
        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        submitFormWithInput();

        // wait for the spinner to appear
        await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    });

    it('submit form sends answer', () => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        // render component with real store
        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        submitFormWithInput();

        // check if websocketService.send() was called
        expect(sendSpy).toHaveBeenCalled();
    });

    it('assessment result shown on assessment response', async () => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        // render component with real store
        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        // simulate positive assessment response to show message
        store.dispatch(propagateCurrentAssessmentResponse(true));

        // wait for the message to appear
        await waitFor(() => expect(screen.getByText('Your answer is correct!')).toBeInTheDocument());

        // simulate negative assessment response to show message
        store.dispatch(propagateCurrentAssessmentResponse(false));

        // wait for the message to appear
        await waitFor(() => expect(screen.getByText('Your answer is wrong!')).toBeInTheDocument());
    });

    it('receiving task result id via websockets subscribes to websocket channel for task result id', async() => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        // render component with real store
        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        // example task result id
        const mockTaskResultId = 1;

        // create a mock observable for the receive method
        const mockReceiveObservable = new Observable((subscriber) => {
            setTimeout(() => {
                subscriber.next(mockTaskResultId);
                subscriber.complete();
            }, 10);
        });

        // make receive return the mock observable
        receiveSpy = jest.spyOn(websocketService, 'receive').mockReturnValue(mockReceiveObservable);

        // trigger form submit
        submitFormWithInput();

        // wait for the Observable to complete
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
        });

        // check if the subscribe, receive, and unsubscribe methods were called with the correct channel
        const expectedChannel = getWebsocketChannelForTaskResultId(sampleTask.id);
        expect(subscribeSpy).toHaveBeenCalledWith(expectedChannel);
        expect(receiveSpy).toHaveBeenCalledWith(expectedChannel);
        expect(unsubscribeSpy).toHaveBeenCalledWith(expectedChannel);

        // check if the subscribeToAssessmentResponse method was called with the correct task result id
        // simulate by checking if websocketService.subscribe() was called with task result id channel
        expect(subscribeSpy).toHaveBeenCalledWith(getWebsocketChannelForTaskResultId(mockTaskResultId));
    });
});
