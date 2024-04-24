"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
      />
    </svg>
  );
}

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="spinner_hzlK" x="1" y="1" width="6" height="22" />
      <rect
        className="spinner_hzlK spinner_koGT"
        x="9"
        y="1"
        width="6"
        height="22"
      />
      <rect
        className="spinner_hzlK spinner_YF1u"
        x="17"
        y="1"
        width="6"
        height="22"
      />
    </svg>
  );
}

export function SimpleUploadButton() {
  const router = useRouter();
  const posthog = usePostHog()


  const { inputProps } = useUploadThingInputProps("imageUploader", {
    //helper functions theo built
    onUploadBegin() {
      posthog.capture("upload begin");
      toast(
        <div className="flex items-center gap-2">
          <span className="text-lg">STATUS</span> <LoadingSpinnerSVG />
        </div>,
        {
          description: "Uploading...",
          duration: 2000,
          id: "upload-begin",
        },
      );
    },
    onClientUploadComplete() {
      toast("STATUS", {
        description: "Upload complete",
        duration: 1000,
        id: "upload-complete",
      });
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col items-start px-6 align-sub">
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
        UPLOAD
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
