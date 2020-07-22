export interface ListingUpdate {
  listingId: string
  name:string  
  marketCategory: {
    CatergoryId:string
    CategoryName: string
  }
  businessCategory:{
    CategoryId:string
    CategoryName:string
  }
  businessModel:string
  Description:string
  phoneNumber:string
  postalCode:string
  address:string
  pictureUrl?: string
}