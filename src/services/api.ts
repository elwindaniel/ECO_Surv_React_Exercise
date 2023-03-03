import axiosInstance from "./axios";

export const getBreedList = () => {
    return axiosInstance.get(`breeds/list/all`)
}

export const getSubBreedList = (body: string) => {
    return axiosInstance.get(`breed/${body}/list`)
}

export const getBreedImageList = (body: string) => {
    return axiosInstance.get(`breed/${body}/images`)
}