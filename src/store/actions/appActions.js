import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE, // CHANGE_LANGUAGE
    language: languageInput // vi, en
})

export const isLoadingApp = (dataInput) => ({
    type: actionTypes.IS_LOADING, // CHANGE_LANGUAGE
    isLoading: dataInput // true, false
})