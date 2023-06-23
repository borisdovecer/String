interface IState {
    theme: boolean;
    provedAccessBirthday: boolean;
}

const initialState: IState = {
    theme: true,
    provedAccessBirthday: false
}

export const toggleTheme = () => ({
    type: 'TOGGLE_THEME'
});

export const setProvedAccessBirthday = () => ({
    type: 'PROVE_BIRTHDAY'
});

const configReducer = (state: IState = initialState, action:any) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: !state.theme
            };
        case 'PROVE_BIRTHDAY':
            return {
                ...state,
                provedAccessBirthday: true
            };
        default:
            return state;
    }
};

export default configReducer;