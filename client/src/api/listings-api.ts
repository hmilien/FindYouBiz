import { apiEndpoint } from '../config'
import { Listing } from '../types/Listing';
import { CreateListingRequest } from '../types/CreateListingRequest';
import Axios from 'axios'
import { UpdateListingRequest } from '../types/UpdateListingRequest';

export async function getListings(idToken: string): Promise<Listing[]> {
  console.log('Fetching listings')

  const response = await Axios.get(`${apiEndpoint}/listings`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Listings:', response.data)
  return response.data.items
}

export async function createListing(idToken: string, newListing: CreateListingRequest): Promise<Listing> {
  
  let test = apiEndpoint
  const response = await Axios.post(`${apiEndpoint}/listings`,  JSON.stringify(newListing), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchListing(
  idToken: string,
  listingId: string,
  updatedListing: UpdateListingRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/listings/${listingId}`, JSON.stringify(updatedListing), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteListing(
  idToken: string,
  listingId: string,
  marketId:string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/listings/${listingId}/${marketId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  listingId: string, 
  marketId:string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/listings/${listingId}/${marketId}/attachment`, '', {
    headers: {
      
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
