"use client"; 

import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function UploadC() {
  const router = useRouter(); //be carefull with this you might import from the wrong place

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          router.refresh(); //re-runs the current route you're on in the server, them sends you down the necessary parts to update the page's content
          // console.log("Files: ", res);
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
