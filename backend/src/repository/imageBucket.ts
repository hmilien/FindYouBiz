import * as AWS  from 'aws-sdk';

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = Number.parseInt(process.env.SIGNED_URL_EXPIRATION) 

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

export async function getUploadUrl(listingId: string): Promise<string> {

     console.log('bucketName', bucketName)
     console.log('listingId', listingId)
     console.log('urlExpiration', urlExpiration)
     
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: listingId,
      Expires: urlExpiration
    })
  }

  export function getAttachmentUrl(listingId: string): string {
    return `https://${bucketName}.s3.amazonaws.com/${listingId}`
  }
  