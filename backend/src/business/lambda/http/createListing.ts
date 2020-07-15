import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { CreateListingRequest } from '../../../requests/CreateListingRequest'
import * as uuid from 'uuid'
import { getUserId } from '../utils'
import { createListing } from "../../../repository/listing";

const logger = createLogger('todo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event, create todo: ', event)
   
    const listingId = uuid.v4()
    const userId = getUserId(event)
    const parsedBody: CreateListingRequest = JSON.parse(event.body)
    
    if(!parsedBody.marketCategory){
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: "marketCategory is required"
      }
    }

    const item = await createListing(userId,listingId,parsedBody)

    logger.info('New Item added : ',item)
    console.log('Processing event, new Todo: ', item)

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: item})
    }
    
}
