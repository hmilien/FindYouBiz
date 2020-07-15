import { String } from "aws-sdk/clients/apigateway";

export interface ListingItem {
  listingId: string
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
  createdBy:string
}
