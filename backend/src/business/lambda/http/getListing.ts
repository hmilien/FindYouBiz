import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../../utils/logger'
import { getListing } from "../../../repository/listing";


const logger = createLogger('todo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing getTodo event: ', event)
  
  const userId = getUserId(event)
  const items = await getListing(userId)
  
  console.log('Processing results: ', items)

  if (items.length !== 0) {
    logger.info('listing found for user id: ',userId)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        items: items})
    }
  }
  
  logger.info('no listing found for user id: ',userId)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
