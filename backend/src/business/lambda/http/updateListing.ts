import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateListingRequest } from '../../../requests/updateListingRequest'
import { createLogger } from '../../../utils/logger'
import { getUserId} from '../utils'
import {updateListing } from "../../../repository/listing";

const logger = createLogger('todo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const item: UpdateListingRequest = JSON.parse(event.body)
  const userId= getUserId(event)

  await updateListing(userId, todoId, item)

  logger.info('todos updated for todo id: ',todoId)

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
