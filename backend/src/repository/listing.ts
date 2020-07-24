import * as AWS  from 'aws-sdk';
import { ListingItem } from "../models/ListingItem";
import { UpdateListingRequest } from "../requests/updateListingRequest";
import { CreateListingRequest } from '../requests/createListingRequest';
import { String } from 'aws-sdk/clients/acm';

const listingTable = process.env.LISTING_TABLE
const listingIdIndex = process.env.LISTING_ID_INDEX
const docClient = new AWS.DynamoDB.DocumentClient()

export async function  getListingById(listingId:string,marketId:String ): Promise<ListingItem> {
    const results = await docClient.query({
      TableName : listingTable,
      IndexName : listingIdIndex,
      KeyConditionExpression: 'marketId = :marketId and listingId = :listingId',
      ExpressionAttributeValues: {
          ':listingId': listingId,
          ':marketId': marketId
      }
    }).promise()

    console.log('Listing found', results)
    return results.Items[0] as ListingItem
  }

  export async function  getListingByName(name:string,marketName:String ): Promise<ListingItem> {
    const results = await docClient.query({
      TableName : listingTable,
      ExpressionAttributeNames: {"#N": "name"},
      KeyConditionExpression: 'marketId = :marketId and #N = :name',
      ExpressionAttributeValues: {
          ':name': name,
          ':marketId': getMarketIdByName(marketName)
      }
    }).promise()

    console.log('Listing found', results)
    return results.Items[0] as ListingItem
  }
  
  export async function getListing():Promise<ListingItem[]>{
    const result = await docClient.scan({
        TableName : listingTable
    }).promise()

    if(result.Items.length > 0)
        return result.Items as ListingItem[]
    else
        return[]
  }

  export async function  deleteListing(marketId:string, name:string ) {
    
    await docClient.delete({
      TableName: listingTable,
      Key:{"marketId" : marketId, "name": name}
    }).promise()
  }

  export async function updateListing(marketId:string, listingId:string, item:UpdateListingRequest){
    
    const listingItem = await getListingById(listingId,marketId)

    await docClient.update({
      TableName: listingTable,
      Key:{ "marketId": marketId, "name":listingItem.name},
      UpdateExpression: "set description = :description, phoneNumber= :phoneNumber",
      ExpressionAttributeValues: {
          "name": item.name,
          ":description": item.description,
          ":phoneNumber": item.phoneNumber
      },
      ReturnValues: "UPDATED_NEW"
      
    }).promise()
  }

  export async function createListing(userId:string,listingId:string, request:CreateListingRequest): Promise<ListingItem>{
    const item = {
        listingId: listingId,
        marketId:getMarketIdByName(request.marketName),
        businessCatergoryId:getBusinessCategoryIdByName(request.businessCategoryName),
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
  export async function  setAttachmentUrl(marketId: string, listingId: string, pictureUrl:string){
    const item = await getListingById(listingId,marketId)
    item.pictureUrl = pictureUrl;
    await docClient.update({
      TableName: listingTable,
      Key:{ "marketId":item.marketId, "name": item.name},
      UpdateExpression: "set pictureUrl = :pictureUrl",
      ExpressionAttributeValues: {
          ":pictureUrl":  item.pictureUrl
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
  
    console.log('Url attached: ', pictureUrl)
  }

  function getMarketIdByName(marketName:string):string
  {
    if(marketName == "test")
      return "1"
    else
      return "2"
  }

  function getBusinessCategoryIdByName(businessCategoryName:string):string
  {
    if(businessCategoryName == "test")
      return "1"
    else
      return "2"
  }