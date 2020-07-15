/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateListingRequest {
  marketCategory: {
    CatergoryId:string
    CategoryName: string
  }
  businessCategory:{
    CategoryId:string
    CategoryName:string
  }
  businessModel:string
  description:string
  phoneNumber:string
  postalCode:string
  address:string
  createdAt: string
  pictureUrl?: string
}
