import { getImage } from "~/server/queries";

//this shouldn't have params in the type because it's not a page (part of the route)
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  return <img src={image.url} className="w-96" />;
}
