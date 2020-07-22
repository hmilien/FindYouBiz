import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateListingRequest } from '../../../requests/updateListingRequest'
import { createLogger } from '../../../utils/logger'
import {updateListing } from "../../../repository/listing";

const logger = createLogger('listing')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const listingId = event.pathParameters.listingId
  const marketId = event.pathParameters.marketId
  const item: UpdateListingRequest = JSON.parse(event.body)

  await updateListing(marketId, listingId, item)

  logger.info('listings updated for listing id: ',listingId)

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items:item
    })
  }
}
