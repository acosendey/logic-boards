import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  //photoID is a string, but we need a number
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Not a valid photo id");
  
  const image = await getImage(idAsNumber);
  
  return  <div className="">{photoId}</div>
  // (<div>
  //   <img src={image.url} className="w-96" />
  // </div>
  //);
}