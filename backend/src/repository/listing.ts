import * as AWS  from 'aws-sdk';
import { ListingItem } from "../models/ListingItem";
import { UpdateTodoRequest } from "../requests/UpdateListingRequest";
import { CreateTodoRequest } from '../requests/CreateListingRequest';

const listingTable = process.env.LISTING_TABLE
const userIdIndex = process.env.USER_ID_INDEX
const docClient = new AWS.DynamoDB.DocumentClient()

export async function  getTodoById(userId:string,listingId:string ): Promise<ListingItem> {
    const results = await docClient.query({
      TableName : listingTable,
      IndexName : userIdIndex,
      KeyConditionExpression: 'todoId = :todoId and userId = :userId',
      ExpressionAttributeValues: {
          ':todoId': listingId,
          ':userId': userId
      }
    }).promise()
    return results.Items[0] as ListingItem
  }
  
  export async function getListing(userId:string):Promise<ListingItem[]>{
    const result = await docClient.query({
        TableName : listingTable,
        IndexName : userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    }).promise()

    if(result.Items.length > 0)
        return result.Items as ListingItem[]
    else
        return[]
  }

  export async function  deleteListing(userId:string,listingId:string ) {
    const item = await getTodoById(userId,listingId)
    console.log('Processing Query for delete: ', item)
    await docClient.delete({
      TableName: listingTable,
      Key:{ "userId": userId, "createdAt":item.createdAt}
    }).promise()
  }

  export async function updateTodo(userId:string, listingId, item:UpdateTodoRequest){
    const todoItem = await getTodoById(userId,listingId)

    await docClient.update({
      TableName: listingTable,
      Key:{ "userId": userId, "createdAt":todoItem.createdAt},
      ExpressionAttributeNames: {"#N": "name"},
      UpdateExpression: "set #N = :name, dueDate:duedate, done:done",
      ExpressionAttributeValues: {
          ":name": item.name,
          ":dueDate": item.dueDate,
          ":done": item.done
      },
      ReturnValues: "UPDATED_NEW"
      
    }).promise()
  }

  export async function createTodo(userId:string,listingId:string, request:CreateTodoRequest): Promise<ListingItem>{
    const item = {
        listingId: listingId,
        userId: userId,
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
    const item = await getTodoById(userId, listingId)
    item.attachmentUrl = attachmentUrl;
    await docClient.update({
      TableName: listingTable,
      Key:{ "userId": userId, "createdAt":item.createdAt},
      UpdateExpression: "set attachmentUrl = :attachmentUrl",
      ExpressionAttributeValues: {
          ":attachmentUrl":  item.attachmentUrl
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
  
    console.log('Url attached: ', attachmentUrl)
  }

 