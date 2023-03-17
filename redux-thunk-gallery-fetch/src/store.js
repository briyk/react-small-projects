import {configureStore} from '@reduxjs/toolkit'
import gallerySlice from './gallerySlice/gallerySlice'


const store = configureStore({
     reducer:{
          gallery: gallerySlice,
     }
})


export default store