import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { CreateListingRequest } from '../../../requests/createListingRequest'
import * as uuid from 'uuid'
import { getUserId } from '../utils'
import { createListing,getListingByName } from "../../../repository/listing";

const logger = createLogger('listing')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event, create listing: ', event)
   
    const listingId = uuid.v4()
    const userId = getUserId(event)
    const parsedBody: CreateListingRequest = JSON.parse(event.body)

    const listingItem = await getListingByName(listingId,parsedBody.marketName)

    if(listingItem !== undefined)
     return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: "name already used"
    }
    
    const item = await createListing(userId,listingId,parsedBody)

    logger.info('New Item added : ',item)
    console.log('Processing event, new listing: ', item)

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
