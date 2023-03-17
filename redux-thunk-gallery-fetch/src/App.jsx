import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getImages } from './gallerySlice/gallerySlice'

const App = () => {
  const images= useSelector( state => state.gallery.images)
  const dispatch = useDispatch() ;
  console.log(images)
  
  
  return (
    <div>
        <h1 style={{textAlign: "center", fontFamily: 'sans-serif'}}>Gallery with RTK</h1>
        <div style={{display: 'flex',justifyContent: 'center'}}>
            <button onClick={() => dispatch(getImages())}>Fetch images</button>
        </div>
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