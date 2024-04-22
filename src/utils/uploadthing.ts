import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
 
import type { OurFileRouter } from "~/app/api/uploadthing/core";
 
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

//export the hooks for use in the app
// notice this is in a object because it's a value because it exists within the SDK
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();