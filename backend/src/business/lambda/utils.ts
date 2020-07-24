import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../../auth/utils";
import { ListingItem } from "../../models/ListingItem";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    return parseUserId(jwtToken)
    return jwtToken;
  } 

  export function canUpdateItem(event: APIGatewayProxyEvent, item: ListingItem) :boolean{
    const currentUserId = getUserId(event)
    return currentUserId === item.createdBy 
  }