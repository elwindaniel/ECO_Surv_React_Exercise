import React from "react";

interface Props {
  breedImagesData: any;
}
const BreedImageList = ({ breedImagesData }: Props) => {
  return (
    <div className="breed-image">
      {breedImagesData?.breedImages
        ? breedImagesData.breedImages.map(
            (url: string, index: number) =>
              index < breedImagesData.numberOfImages && (
                <img 
                  className="breed-image__img"
                  alt="breed-image__img"
                  src={url}
                  key={index}
                />
              )
          )
        : null}
    </div>
  );
};

export default BreedImageList;
