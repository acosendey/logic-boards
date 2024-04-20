import FullPageImageView from "~/components/full-image-view";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  //photoID is a string, but we need a number
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Not a valid photo id");

  return <FullPageImageView id={idAsNumber} />;
}
