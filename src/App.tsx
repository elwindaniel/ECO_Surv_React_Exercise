import React, { useState } from 'react';
import './App.css';
import BreedFinderForm from './components/breedFinderForm';
import BreedImageList from './components/breedImageList';

const App:React.FC =()=> {

  const[data, setData] =useState({})
  const onSuccess =(data: any)=>{
    setData(data)
  }

  return (
    <div className="App">
      <BreedFinderForm onSuccess={onSuccess}/>
      <BreedImageList breedImagesData={data} />
    </div>
  );
}

export default App;
