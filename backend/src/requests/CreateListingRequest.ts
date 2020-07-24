/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateListingRequest {
  name:string,
  marketName: string  
  businessCategoryName:string
  businessModel:string
  description:string
  phoneNumber:string
  postalCode:string
  address:string
}
