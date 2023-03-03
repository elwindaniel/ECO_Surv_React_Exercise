import React, { useEffect, useState } from "react";
import {
  getBreedImageList,
  getBreedList,
  getSubBreedList,
} from "../services/api";
import { BreedForm } from "../models/breedForm";
import { IMAGE_URL } from "../services/constant";

interface Props {
  onSuccess: any;
}

const BreedFinderForm = ({ onSuccess }: Props) => {
  let subBreedImages: any = [];

  const [breeds, setBreeds] = useState<string[]>([]);
  const [breedImages, setBreedImages] = useState<string[]>([]);
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [data, setData] = useState<BreedForm>({
    breedName: "",
    subBreedName: "",
    numberOfImages: 0,
  });
  const [error, setError] = useState({
    breedName: false,
    subBreedName: false,
    numberOfImages: false,
  });

  useEffect(() => {
    GetBreedList();
  }, []);

  const GetBreedList = () => {
    getBreedList().then((res) => {
      let breedList = Object.keys(res.data.message);
      setBreeds(breedList);
    });
  };

  const GetSubBreedList = (e: React.SyntheticEvent<EventTarget>) => {
    const breedName = (e.target as HTMLInputElement).value;
    setData({ breedName: breedName, subBreedName: "", numberOfImages: 0 });
    setError({ ...error, breedName: false });

    getSubBreedList(breedName).then((res) => {
      setSubBreeds(res.data.message);
      GetImages(breedName, res.data.message);
    });
  };

  const GetImages = (breedName: string, subBreed: []) => {
    getBreedImageList(breedName).then((res) => {
      setBreedImages(res.data.message);
      if (subBreed.length === 0) {
        setImages(res.data.message);
      }
    });
  };

  const seletedSubBreed = (e: React.SyntheticEvent<EventTarget>) => {
    const subBreedName = (e.target as HTMLInputElement).value;
    setData({ ...data, subBreedName: subBreedName });
    setError({ ...error, subBreedName: false });

    for (const breedImage of breedImages) {
      let subBreed = `${data.breedName}-${subBreedName}`;
      let subBreedLenght = 30 + subBreed.length;
      let breedImageUrl = `${breedImage.substring(0, subBreedLenght)}`;
      let imageUrl = `${IMAGE_URL}${data.breedName}-${subBreedName}`;
      if (breedImageUrl === imageUrl) {
        subBreedImages.push(breedImage);
      }
    }
    setImages(subBreedImages);
  };

  const NoOfImages = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const numberOfImages = (e.target as HTMLInputElement).value;
    // setError({...error, numberOfImages: false });
    setData({ ...data, numberOfImages: Number(numberOfImages) });
  };

  const ViewImages = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    let errorData = {
      breedName: false,
      subBreedName: false,
      numberOfImages: false,
    };
    if (data.breedName.length === 0) {
      errorData.breedName = true;
    }
    if (subBreeds.length > 0) {
      if (data.subBreedName.length === 0) {
        errorData.subBreedName = true;
      }
    }
    if (data.numberOfImages === 0) {
      errorData.numberOfImages = true;
    }
    setError(errorData);
    onSuccess({ numberOfImages: data.numberOfImages, breedImages: images });
  };

  return (
    <form className="Form" onSubmit={ViewImages}>
      <div className="Form--input-group">
        <label className="Form--input-label">Breed</label>
        <select
          className={`Form--input ${error.breedName ? "Form--error" : ""}`}
          id="breedName"
          onChange={GetSubBreedList}
        >
          <option>Select</option>
          {breeds.length > 0
            ? breeds?.map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))
            : null}
        </select>
      </div>
      {subBreeds.length > 0 ? (
        <div className="Form--input-group">
          <label className="Form--input-label">Sub Breed</label>
          <select
            className={`Form--input ${error.subBreedName ? "Form--error" : ""}`}
            onChange={seletedSubBreed}
            id="subBreedName"
            value={data.subBreedName}
          >
            <option>Select</option>
            {subBreeds.length > 0
              ? subBreeds?.map((subBreed, index) => (
                  <option key={index} value={subBreed}>
                    {subBreed}
                  </option>
                ))
              : null}
          </select>
        </div>
      ) : null}
      <div className="Form--input-group">
        <label className="Form--input-label">Number of Images</label>
        <select
          className={`Form--input ${error.numberOfImages ? "Form--error" : ""}`}
          onChange={NoOfImages}
          id="numberOfImages"
          value={data.numberOfImages}
        >
          <option>Select</option>
          {images.length > 0
            ? images?.map((image, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))
            : null}
        </select>
      </div>
      <button className="Form--button">View Images</button>
    </form>
  );
};

export default BreedFinderForm;
