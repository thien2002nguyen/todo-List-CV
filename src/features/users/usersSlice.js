import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: { userList: [] },
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
    },
});

export const { setUserList } = userSlice.actions;
export default userSlice.reducer;