import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { CreateTodoRequest } from '../../../requests/CreateListingRequest'
import * as uuid from 'uuid'
import { getUserId } from '../utils'
import { createTodo } from "../../../repository/listing";

const logger = createLogger('todo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event, create todo: ', event)
   
    const listingId = uuid.v4()
    const userId = getUserId(event)
    const parsedBody: CreateTodoRequest = JSON.parse(event.body)
    
    if(!parsedBody.name){
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: "name is required"
      }
    }

    const item = await createTodo(userId,listingId,parsedBody)

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
