import { useState, useRef } from "react";
import { type Crop } from "react-image-crop";
import DefaultAvatarImg from "assets/images/default-avatar.png";

import CropAvatarModal from "./CropAvatarModal";

const AvatarContainer = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [resultImgCrop, setResultImgCrop] = useState<string>("");

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = "";
      hiddenFileInput.current.click();
    }
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setCrop(undefined);
      setOpen(true);
      setImgSrc(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="border-black">
      <div className="border-black">
        <button
          onClick={handleClick}
          className="w-[160px] h-[160px] rounded-full hover:ring-2 ring-[#d6f059] transition-all border-black"
        >
          {resultImgCrop ? (
            <img
              src={resultImgCrop}
              className="rounded-full w-[160px] h-[160px] filter bg-[#d6f059] border-black"
              alt="crop avatar"
            />
          ) : (
            <img
              src={DefaultAvatarImg}
              className="rounded-full w-[160px] h-[160px] border-black"
              alt="default avatar img"
            />
          )}
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
      </div>
      <CropAvatarModal
        open={open}
        onClose={() => setOpen(false)}
        crop={crop}
        imgSrc={imgSrc}
        setCrop={setCrop}
        setResultImgCrop={setResultImgCrop}
      />
    </div>
  );
};

export default AvatarContainer;
