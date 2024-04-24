import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("User not found");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  //we could make sure the user has access to the image here
  const user = auth();

  if (!user.userId) throw new Error("User not found");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Not authorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  //we can delete this part because we are only deleting the image and 
  // const image = await db.query.images.findFirst({
  //   where: (model, { eq }) => eq(model.id, id),
  // });

  // if (!image) throw new Error("Image not found");

  // if (image.userId !== user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  redirect("/");
}