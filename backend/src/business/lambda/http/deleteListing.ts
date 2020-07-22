import 'source-map-support/register'
import { createLogger } from '../../../utils/logger'
//import { getUserId} from '../utils'
import { deleteListing,getListingById } from "../../../repository/listing";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const logger = createLogger('listing')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event, delete listing: ', event)
    
  const listingId = event.pathParameters.listingId
  const marketId = event.pathParameters.marketId

  const listingItem = await getListingById(listingId,marketId)
    
  if(listingItem === undefined)
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: `not found`
    }

  console.log('Processing delete listing for listingId: ', listingItem.name)

  await deleteListing(marketId,listingItem.name)

  logger.info('Listing deleted : ',listingId)

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: `Listing ${listingId} deleted`
  }
}

