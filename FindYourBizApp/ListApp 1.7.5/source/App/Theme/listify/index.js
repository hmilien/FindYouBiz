/** @format */

import _Post from './data/Post'
export const Post = _Post

import _ListingDataDetail from '@components/Detail/ListingData'
export const ListingDataDetail = _ListingDataDetail

import _ModalPhoto from '@components/Modal/Photo'
export const Modal = {
  Photo: _ModalPhoto,
}

import { PostLayout as _PostLayout } from '@components'
export const PostLayout = _PostLayout

// from container folder
import _Payment from './Container/Cart/Payment'
export const Payment = _Payment

import _PostNewContent from './Container/PostNewContent'
export const PostNewContent = _PostNewContent

import _PostNewListing from './Container/PostNewListing'
export const PostNewListing = _PostNewListing

import _Filter from './Container/Filter'
export const Filter = _Filter
