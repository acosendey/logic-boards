import { SignedIn, SignedOut } from "@clerk/nextjs";
import UploadC from "./_components/uploadzone";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

// export const dynamic = ""; #add dynamic rendering

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[...images, ...images, ...images, ...images].map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              width={200}
              height={200}
              alt={image.name}
            />
          </Link>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <UploadC />
        <div className="h-full w-full text-center text-2xl">Sign In Pls</div>
      </SignedOut>
      <SignedIn>
        <Images />
        <UploadC />
      </SignedIn>
    </main>
  );
}
