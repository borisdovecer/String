const initialState = {
    theme: true,
}

export const toggleTheme = () => ({
    type: 'TOGGLE_THEME'
});

const configReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: !state.theme
            };
        default:
            return state;
    }
};

export default configReducer;