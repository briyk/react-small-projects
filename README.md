## installation

Vite

```javascript

npm create vite@latest
```

Redux-toolkit and React-Redux

```javascript

npm i @reduxjs/toolkit react-redux
```

## Create Store

```javascript
import {configureStore} from '@reduxjs/toolkit'
const store = configureStore({
name: 'test',
reducers:{}
})
export default store
```

## link to index.js

```javascript
import store from './store'
import {Provider} from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render()
```

## initialize our reducer

```javascript
import {createSlice} from '@reduxjs/toolkit'

const initialState ={
     loading: true,
     images: [],
     error: false,
}

export const gallerySlice = createSlice({
     name: 'gallery',
     initialState,
     reducer:{
          
     }
})

export default gallerySlice.reducer ;
```

## create our asyncthunk function

```javascript
const getImages = createAsyncThunk(
'images/getImages',
async () => {
const res = await fetch('https://picsum.photos/v2/list?page=2&limit=100')
const newRes = await res.json();
return newRes ;
}
)
```

## make async reducers cases with extraReducers

```javascript
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
```

## get data into UI

```javascript
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getImages } from './gallerySlice/gallerySlice'

const App = () => {
  const images= useSelector( state => state.gallery)
  const dispatch = useDispatch() ;
  console.log(images)
  
  useEffect( ()=>{
    dispatch(getImages())
  } ,[dispatch] )

  return (
    <div>
        <h1 style={{textAlign: "center", fontFamily: 'sans-serif'}}>Gallery with RTK</h1>
    </div>
  )
}

export default App
```

## make gallery

```javascript
const App = () => {
  const images= useSelector( state => state.gallery.images)
  const dispatch = useDispatch() ;


  return (
    <div>
        <h1 style={{textAlign: "center", fontFamily: 'sans-serif'}}>Gallery with RTK</h1>
        <div className="grid">
            {
              images.map( item => (
                <img src={item.download_url} key={item.id}/>
              ))
            }
        </div>
    </div>
  )
}
export default App
```