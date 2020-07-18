import * as AWS  from 'aws-sdk';

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = Number.parseInt(process.env.SIGNED_URL_EXPIRATION) 

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

export async function getUploadUrl(todoId: string): Promise<string> {
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: todoId,
      Expires: urlExpiration
    })
  }

  export function getAttachmentUrl(listingId: string): string {
    return `https://${bucketName}.s3.amazonaws.com/${listingId}`
  }
  