import {configureStore} from '@reduxjs/toolkit';
import {applicationState} from '../applicationState';
// Change for Admin Interface - Starts
import appCommonSlice from "../../admin-components/store/adminAppCommonOperations";
import adminAppJSONFormation from "../../admin-components/store/adminAppJSONFormation";
import hintsWithOrderSlice from "../../admin-components/store/slices/hintsWithOrderSlice";
import loginAuthenticationSlice from "../../admin-components/store/slices/loginAuthenticationSlice";
import quesMultipleChoiceSlice from "../../admin-components/store/slices/quesMultipleChoiceSlice";
import textHintSlice from "../../admin-components/store/slices/textHintSlice";
import sessionValidationSlice from '../../admin-components/store/slices/sessionValidationSlice';
import saveHintsCollectionSlice from '../../admin-components/store/slices/saveHintsCollectionSlice';
import  saveQuestionAnswerSlice  from '../../admin-components/store/slices/questionAndAnswerSlice';
import  saveGraphJSONSlice  from '../../admin-components/store/slices/saveGraphSlice';
// Change for Admin Interface - Ends
export const store = configureStore({
    reducer: {
        applicationStateManagement: applicationState.reducer,
        // Change for Admin Interface - Starts
        appCommonSlice,
        textHintSlice,
        quesMultipleChoiceSlice,
        hintsWithOrderSlice,
        adminAppJSONFormation,
        loginAuthenticationSlice,
        sessionValidationSlice,
        saveHintsCollectionSlice,
        saveQuestionAnswerSlice,
        saveGraphJSONSlice
        // Change for Admin Interface - Ends
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;