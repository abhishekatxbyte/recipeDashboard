import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


// First, create the thunk
export const getRecipes = createAsyncThunk(
    "projects/getProjects",
    async () => {
        const response = await axios.get('http://localhost:3000/recipes')
        return response.data
    }
)
interface UsersState {
  recipes: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  calanderDays:[]| any
  
}

const initialState = {
  recipes: [],
  loading: 'idle',
  calanderDays:[
    { day: "mon", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "tue", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "wed", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "thu", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "fri", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "sat", foodTime: { breakFast: [], lunch: [], dinner: [] } },
    { day: "sun", foodTime: { breakFast: [], lunch: [], dinner: [] } },
  ]
} as UsersState

// Then, handle actions in your reducers:
const RecipeSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
//     setCalanderDays(state,action){
// console.log(state)
// console.log(action.payload)

//     }
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getRecipes.fulfilled, (state, action:any) => {
      state.recipes = action.payload
      state.loading = "succeeded"
    }).addCase(getRecipes.pending,(state:UsersState)=>{
state.loading="pending"
    }).addCase(getRecipes.rejected,(state:UsersState)=>{
      state.loading="failed"
          })
  },
})
// export const {setCalanderDays} =RecipeSlice.actions
export default RecipeSlice.reducer