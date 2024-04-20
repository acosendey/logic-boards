import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

//this shouldn't have params in the type because it's not a page (part of the route)
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="flex-shrink object-contain" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b text-center text-lg">{image.name}</div>

        <div className="flex flex-col p-2 ">
          <span className="text-gray-50/30 text-sm">Uploaded by</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2 ">
          <span className="text-gray-50/30 text-sm">Created on</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
