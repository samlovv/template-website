import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export const utapi = new UTApi();
