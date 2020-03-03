const { BlobServiceClient } = require('@azure/storage-blob');
const uuidv1 = require('uuid/v1');
require('dotenv').config();

async function main() {
  console.log('Azure Blob storage v12 - JavaScript quickstart sample');
  // Quick start code goes here

  // Retrieve the connection string for use with the application. The storage
// connection string is stored in an environment variable on the machine
// running the application called AZURE_STORAGE_CONNECTION_STRING. If the
// environment variable is created after the application is launched in a
// console or with Visual Studio, the shell or application needs to be closed
// and reloaded to take the environment variable into account.

  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

// Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Create a unique name for the container
  const containerName = 'jssdktestontainer' + uuidv1();

  console.log('\nCreating container...');
  console.log('\t', containerName);

// Get a reference to a container
  const containerClient = await blobServiceClient.getContainerClient(containerName);

// Create the container
  const createContainerResponse = await containerClient.create();
  console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

  // Create a unique name for the blob
  const blobName = 'jstestfile1' + uuidv1() + '.txt';

// Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log('\nUploading to Azure storage as blob:\n\t', blobName);

// Upload data to the blob
  // todo: upload a file
  const data = 'Hello, World!';
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

  console.log('\nListing blobs...');

// List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name);
  }
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));


