import 'source-map-support/register'
import { createLogger } from '../../../utils/logger'
import { getUserId} from '../utils'
import { deleteListing, getListingById } from "../../../repository/listing";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const logger = createLogger('listing')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event, delete listing: ', event)
    
  const listingId = event.pathParameters.listingId
  const userId= getUserId(event)

  const item = await getListingById(userId, listingId)
  await deleteListing(userId,listingId,item.marketId)

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

