# FindYouBiz
 
 Serverless FindYourBiz

We  need to implement a simple Business directory application using AWS Lambda and Serverless framework. 

# Functionality of the application

This application will allow creating/removing/updating/fetching business items. Each business item can optionally have an attachment image. Each user can update or delete only business items that he/she has created.

# Business items

The application should store business items, and each business item contains the following fields:

* `listingId` (string) - a unique id for an business entry
* `marketId` (string) - a unique Id to specify the market that the business target
  `marketName` (string) - name associated with the marketId (e.g...USA,Cananda, Chicago, World)
* `name` (string) - name of a business entry (e.g. "RONA"). Must be unique by market
* `businessCatergoryId` (string) -an id to identify the business category 
  `businessCatergoryName` (string) -name associated with the id identify the business category (e.g. retail, online services...)
* `createdBy` (string) - userid  that created the entry in the database
* `pictureUrl` (string) (optional) - a URL pointing to an image attached to a Business item
  `createdAt` (string) -string representation of the date it was created in the system
  `description` (string) -business description
  `phoneNumber` (string) -business phone number
  `postalCode` (string) -business postal code
  `address` (string) - business address

# Functions to be implemented

To implement the project, we implement the following functions and configure them in the `serverless.yml` file:

* `Auth` - this function should implement a custom authorizer for API Gateway that should be added to all other functions.

* `GetListings` - should return all Business in the database, regardless of the user

* `CreateListing` - should create a new Bussiness. A shape of data send by a client application to this function can be found in the `CreateListingRequest.ts` file

* `UpdateListing` - should update a Business item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateListingRequest.ts` file

* `DeleteListing` - should delete a Business item created by a current user. Expects an id of a business and the market id of the item to remove.

* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a Business entry.

It should return a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```