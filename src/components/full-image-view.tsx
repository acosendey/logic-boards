import { getImage } from "~/server/queries";

//this shouldn't have params in the type because it's not a page (part of the route)
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="flex-shrink object-contain" />
      </div>
      <div className="flex w-48 flex-shrink flex-col">
        <div className="text-xl font-bold text-white">{image.name}</div>
      </div>
    </div>
  );
}
