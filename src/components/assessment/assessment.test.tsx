import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import Assessment, {getWebsocketChannelForTaskResultId} from './assessment';
import {WebsocketService} from '../../websockets/websocketService';
import {GraphDTO, QuestionDTO, TaskDTO} from "../../src-gen/mathgrass-api";
import userEvent from "@testing-library/user-event";
import {store} from "../../state/common/store";
import {propagateCurrentAssessmentResponse, setCurrentTask} from "../../state/applicationState";

// store reference to original WebSocketService functions
const originalReceive = WebsocketService.prototype.receive;

// mock the WebSocketService
WebsocketService.prototype.connect = jest.fn();
WebsocketService.prototype.send = jest.fn();
WebsocketService.prototype.subscribe = jest.fn();
WebsocketService.prototype.receive = jest.fn().mockReturnValue({
    subscribe: jest.fn(),
});
WebsocketService.prototype.unsubscribe = jest.fn();
WebsocketService.prototype.onDestroy = jest.fn();

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

    it('submit form subscribes to websocket channel with task id', () => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        // render component with real store
        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        // submit form
        submitFormWithInput();

        // check if websocket service subscribe was called with task id
        expect(WebsocketService.prototype.subscribe).toHaveBeenCalledWith(getWebsocketChannelForTaskResultId(sampleTask.id));
    });

    it('receiving task result id via websockets subscribes to websocket channel for task result id', () => {
        // set current task
        store.dispatch(setCurrentTask(sampleTask));

        // render component with real store
        render(
            <Provider store={store}>
                <Assessment />
            </Provider>
        );

        // make websocket receive function call the original function
        // @ts-ignore
        WebsocketService.prototype.receive = jest.fn((callback) => {
            return {
                subscribe: jest.fn().mockImplementation((cb) => {
                    // Call the original implementation with the callback
                    originalReceive.call(WebsocketService.prototype, cb);
                }),
            };
        });

        // submit form
        submitFormWithInput();

    });
});
