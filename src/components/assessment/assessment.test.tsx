import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Assessment from './assessment';
import { WebsocketService } from '../../websockets/websocketService';
import {GraphDTO, QuestionDTO, TaskDTO} from "../../src-gen/mathgrass-api";
import userEvent from "@testing-library/user-event";
import {store} from "../../state/common/store";
import {setCurrentTask} from "../../state/applicationState";

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

// set up the mock store
const storeCreator = configureStore([]);
const initialState = {
    applicationStateManagement: {
        currentTask: sampleTask,
        currentAnswer: undefined,
        currentAssessmentResponse: null,
        showWaitingForEvaluation: false,
    },
};

describe('Assessment Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing and shows question', () => {
        // render component with mocked store
        const mockStore = storeCreator(initialState);
        render(
            <Provider store={mockStore}>
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

        // insert answer
        const inputElement = screen.getByRole('textbox');
        userEvent.type(inputElement, '4');

        // get button
        const submitButton = screen.getByTestId('submitAnswerButton');
        userEvent.click(submitButton);

        // wait for the spinner to appear
        await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    });
});
