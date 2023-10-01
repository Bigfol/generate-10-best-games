import { Dialog } from "@headlessui/react";
import { useState, useRef } from "react";
import ReactCrop, {
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";

import { canvasPreview } from "~/utils/canvasPreview";

let previewUrl = "";

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 160,
        height: 160,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

type CropAvatarModalPropTypes = {
  open: boolean;
  onClose: () => void;
  setResultImgCrop: (value?: any) => void;
  imgSrc: string;
  crop: any;
  setCrop: (value?: any) => void;
};

const CropAvatarModal = ({
  open,
  onClose,
  setResultImgCrop,
  imgSrc,
  crop,
  setCrop,
}: CropAvatarModalPropTypes) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale] = useState(1);
  const [rotate] = useState(0);
  const [aspect] = useState<number | undefined>(1);

  const onDownloadCropClick = async () => {
    const canvas = document.createElement("canvas");
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      canvasPreview(imgRef.current, canvas, completedCrop, scale, rotate);
    }
    const blob = await toBlob(canvas);

    if (!blob) {
      console.error("Failed to create blob");
      return "";
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(blob);

    setResultImgCrop(previewUrl);
    setCrop(undefined);
    onClose();
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-[560px] rounded bg-[#101010] p-12">
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              maxHeight={500}
              minHeight={160}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          <button
            className="bg-[#e7e3b3] text-black w-full text-base font-medium uppercase p-2 mt-2"
            onClick={onDownloadCropClick}
          >
            Сохранить
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CropAvatarModal;
