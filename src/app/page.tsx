import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import UploadC from "./_components/uploadzone";

// export const dynamic = ""; #add dynamic rendering

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <img src={image.url} />
          <div className="">{image.name}</div>
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
