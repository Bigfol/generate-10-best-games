import { type MetaFunction } from "@remix-run/node";
import { useRef } from "react";

import Logo from "assets/images/10-greatest-games.jpg";
import FooterDecorLines from "assets/images/bottom-lines.jpg";
import AvatarContainer from "~/component/AvatarContainer";
import Input from "~/component/Input";
import domtoimage from "dom-to-image";

export const meta: MetaFunction = () => {
  return [{ title: "Generate 10 Best Game" }];
};

export default function Index() {
  const printRef = useRef(null);
  const arrayGames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleDownloadImage = async () => {
    if (printRef.current)
      domtoimage.toJpeg(printRef.current).then(function (dataUrl: string) {
        var link = document.createElement("a");
        link.download = "10-best-game-kp.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="bg-black text-center py-8 border-black">
      <div className="border border-slate-50 w-[1084px] mx-auto h-[1084px]">
        <div
          className="w-[1080px] mx-auto h-[1080px] bg-black border-black relative p-[60px]"
          ref={printRef}
        >
          <img
            src={FooterDecorLines}
            className="absolute right-0 bottom-0 border-black"
            alt="decor"
          />
          <header className="flex justify-between border-black">
            <img src={Logo} alt="logo" className="border-black" />
            <div className="h-[250px] text-right flex flex-col justify-between border-black">
              <AvatarContainer />
              <div className="mt-3 border-black">
                <Input
                  placeholder="Ваше имя"
                  className="mb-1 text-4xl w-full font-semibold text-right"
                />
                <Input
                  placeholder="Кто вы такой"
                  className="text-xl w-full text-right font-mediun"
                />
              </div>
            </div>
          </header>
          <section className="mt-[120px] border-black">
            <div className="columns-2 border-black">
              {arrayGames.map((item) => (
                <div className="mb-10 border-black" key={item}>
                  <Input
                    className="w-full text-2xl font-semibold h-14"
                    number={item}
                    placeholder={`Игра №${item}`}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <button
        className="bg-[#e7e3b3] text-black w-[1080px] text-center mx-auto text-base font-medium uppercase p-2 mt-4"
        onClick={handleDownloadImage}
      >
        Скачать JPG
      </button>
    </div>
  );
}
