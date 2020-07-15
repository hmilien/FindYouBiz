import * as AWS  from 'aws-sdk';
import { ListingItem } from "../models/ListingItem";
import { UpdateListingRequest } from "../requests/UpdateListingRequest";
import { CreateListingRequest } from '../requests/CreateListingRequest';

const listingTable = process.env.LISTING_TABLE
const docClient = new AWS.DynamoDB.DocumentClient()

export async function  getListingById(userId:string,listingId:string ): Promise<ListingItem> {
    const results = await docClient.query({
      TableName : listingTable,
      KeyConditionExpression: 'listingId = :listingId and userId = :userId',
      ExpressionAttributeValues: {
          ':listingId': listingId,
          ':userId': userId
      }
    }).promise()
    return results.Items[0] as ListingItem
  }
  
  export async function getListing():Promise<ListingItem[]>{
    const result = await docClient.query({
        TableName : listingTable
    }).promise()

    if(result.Items.length > 0)
        return result.Items as ListingItem[]
    else
        return[]
  }

  export async function  deleteListing(userId:string,listingId:string ) {
    const item = await getListingById(userId,listingId)
    console.log('Processing Query for delete: ', item)
    await docClient.delete({
      TableName: listingTable,
      Key:{ "listingId": listingId, "createdBy":item.createdBy}
    }).promise()
  }

  export async function updateListing(userId:string, listingId, item:UpdateListingRequest){
    const listingItem = await getListingById(userId,listingId)

    await docClient.update({
      TableName: listingTable,
      Key:{ "listingId": listingId, "createdBy":listingItem.createdBy},
      UpdateExpression: "set description = :description, phoneNumber= :phoneNumber",
      ExpressionAttributeValues: {
          ":description": item.description,
          ":phoneNumber": item.phoneNumber
      },
      ReturnValues: "UPDATED_NEW"
      
    }).promise()
  }

  export async function createListing(userId:string,listingId:string, request:CreateListingRequest): Promise<ListingItem>{
    const item = {
        listingId: listingId,
        createdBy: userId,
        createdAt: new Date().toLocaleTimeString(),
        ...request
      }

     await docClient.put({
        TableName: listingTable,
        Item: item
      }).promise()

      return item as ListingItem
  }
  export async function  setAttachmentUrl(userId: string, listingId: string, attachmentUrl:string){
    const item = await getListingById(userId, listingId)
    item.pictureUrl = attachmentUrl;
    await docClient.update({
      TableName: listingTable,
      Key:{ "listingId": listingId, "createdAt":item.createdBy},
      UpdateExpression: "set attachmentUrl = :attachmentUrl",
      ExpressionAttributeValues: {
          ":attachmentUrl":  item.pictureUrl
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
  
    console.log('Url attached: ', attachmentUrl)
  }

 