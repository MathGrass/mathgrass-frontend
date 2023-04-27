import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FetchError, TaskDTO, TaskIdLabelTupleDTO} from '../src-gen/mathgrass-api';
import {fetchAssessment, fetchAvailableTasks, fetchHint, fetchTaskById} from './requestThunks';


interface ApplicationState {
    graphInEditor: any;
    hintLevel: number;
    currentTask: TaskDTO | null;
    currentAssessmentResponse: boolean | null;
    availableTasks: TaskIdLabelTupleDTO[];
    showFeedbackSection: boolean;
    showWaitingForEvaluation: boolean;
    assessmentFeedback: string | undefined;
    currentAnswer: string | undefined;
    hintHistory: string [];
}

function getInitialApplicationState(): ApplicationState {
    return {
        graphInEditor: undefined,
        hintLevel: 0,
        currentTask: null,
        currentAssessmentResponse: null,
        showFeedbackSection: false,
        showWaitingForEvaluation: false,
        assessmentFeedback: undefined,
        hintHistory: [] as string[],
        availableTasks: [] as TaskIdLabelTupleDTO[],
        currentAnswer: undefined
    };
}

const initialTaskState: ApplicationState = getInitialApplicationState();
export const applicationState = createSlice({
    name: 'tasks', initialState: initialTaskState, reducers: {
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        },
        propagateCurrentAnswer: (state, action: PayloadAction<string>) => {
            state.currentAnswer = action.payload;
            state.showWaitingForEvaluation = true;
        },
    }, extraReducers: (builder) => {
        builder.addCase(fetchTaskById.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.currentTask = action.payload as TaskDTO;
                state.currentAssessmentResponse = null;
                state.hintHistory = [];
                state.hintLevel = 0;
                state.assessmentFeedback = undefined;
            }
        });
        builder.addCase(fetchHint.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.hintHistory.push(action.payload.content);
                state.hintLevel = state.hintLevel + 1;
            }
        });
        builder.addCase(fetchAssessment.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.currentAssessmentResponse = action.payload.isAssessmentCorrect as boolean;
                state.showWaitingForEvaluation = false;
            }
        });
        builder.addCase(fetchAvailableTasks.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.availableTasks = action.payload;
            }
        });
    }
});

function isFetchErrorOrUndefined(action: PayloadAction<any>){
    // check whether the generated fetch api returned an error
    const fetchErrorName = FetchError.name;
    return action === undefined || ('name' in action.payload && action.payload.name === fetchErrorName);
}


export const {
    propagateGraphState,
    propagateCurrentAnswer
} = applicationState.actions;
