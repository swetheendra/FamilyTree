// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient } from "@azure/storage-blob";

const containerName = `uploaded`;
const sasToken = "sp=racwdl&st=2023-05-18T03:29:45Z&se=2026-02-01T12:29:45Z&sv=2022-11-02&sr=c&sig=t1kP4F2K5sAUK9ve1o3XwQbBuxipXy8SuR94vu0t%2BQY%3D";
const storageAccountName = "imagetreest"
// </snippet_package>

// <snippet_get_client>
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
console.log(uploadUrl);

// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(uploadUrl);

// get Container - full public read access
const containerClient =
  blobService.getContainerClient(containerName);
// </snippet_get_client>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
export const getBlobsInContainer = async () => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    const blobItem = {
      url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
      name: blob.name
    }

    // if image is public, just construct URL
    returnedBlobUrls.push(blobItem);
  }

  return returnedBlobUrls;
};
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (file, name) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(`${name}.png`);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  return await blobClient.uploadData(file, options);
};
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file, name) => {
  if (!file) return;

  // upload file
  return await createBlobInContainer(file, name);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
