import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'

const initialState ={
     loading: false,
     images: [],
     error: false,
}

export const getImages = createAsyncThunk(
     'images/getImages',
     async () => {
          const res = await fetch('https://picsum.photos/v2/list?page=2&limit=100')
          const newRes = await res.json();
          return newRes ;
     }
    
)


export const gallerySlice = createSlice({
     name: 'gallery',
     initialState,
     extraReducers:{
          [getImages.pending]: (state) =>{
               state.loading = true 
          },
          [getImages.fulfilled]: (state, action) =>{
               state.loading = false,
               state.images = action.payload
          },
          [getImages.rejected]: state =>{
               state.loading = false,
               state.error = true
          }
     }
})


export default gallerySlice.reducer ;