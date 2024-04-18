import Image from "next/image";
import { db } from "~/server/db";

const mockUrls = [
  // "https://utfs.io/f/0078cc30-3c0c-413c-b852-02c6ae795139-n4t9ue.gif",
  "https://utfs.io/f/0ed62a0e-3092-46a6-8cb7-2b489a8c3674-hri5ku.png",
  "https://utfs.io/f/3ae1e4dc-9333-4801-a695-1995f77b7189-44auw7.jpg",
  "https://utfs.io/f/4e9d6a9a-0b67-4d2f-9089-10865db1752b-hk9pq1.png",
  "https://utfs.io/f/72e425ac-7766-4246-b314-97c97851efd6-w44wb0.jpg",
  "https://utfs.io/f/f4acb904-bfb9-448c-a0d3-0e196c49e100-nhjy5y.jpg"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index+1,
  url,
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4"> 
      {posts.map((post) => (
        <div key={post.id}> {post.name}   </div>
      ))}
      {[...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))
      }
      </div>
    </main>
  );
}
