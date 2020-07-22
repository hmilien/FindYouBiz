import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { getUploadUrl,getAttachmentUrl} from '../../../repository/imageBucket'
import { setAttachmentUrl } from "../../../repository/listing";


const logger = createLogger('listing')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const listingId = event.pathParameters.listingId
  const marketId = event.pathParameters.marketId

  console.log('Caller event - PresignedUrl', event)
  
  const url = getUploadUrl(listingId)

  logger.info('Url generated : ',url)
  
  const attachmentUrl = getAttachmentUrl(listingId)
   
  await setAttachmentUrl(marketId,listingId,attachmentUrl)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: url
    }) 
  }
}


