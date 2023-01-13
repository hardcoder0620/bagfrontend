import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName:'',
    token:'',
    userId:''
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state,action) => {
      return {...state,...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer