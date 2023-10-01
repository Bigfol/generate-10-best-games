import { twMerge } from "tailwind-merge";

const Input = ({
  placeholder,
  className,
  number,
}: {
  number?: number | string;
  placeholder: string;
  className?: string;
}) => {
  return (
    <div className="flex items-center gap-4 border-black">
      {number && (
        <div className="text-white text-5xl font-bold w-[56px] text-right border-black border-none">
          {number}
        </div>
      )}
      <input
        className={twMerge(
          "bg-black outline-none text-white hover:bg-[#252525] focus:bg-[#252525] px-2 py-1 placeholder:text-white/40 transition-all",
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
