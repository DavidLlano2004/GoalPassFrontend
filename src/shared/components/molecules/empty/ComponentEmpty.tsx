import React from "react";

interface Props {
  textComponentEmpty: string;
  textSize?: string;
  iconSize?: string;
}

export const ComponentEmpty = ({
  textComponentEmpty,
  textSize = "lg:text-[20px] text-[18px]",
  iconSize = "text-[60px]",
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <i
        className={`fi fi-tr-drawer-empty text-transparent bg-clip-text bg-linear-to-r from-blue-1-custom to-green-1-custom ${iconSize} flex`}
      ></i>
      <p className={`text-white ${textSize}  font-bol text-center`}>
        {textComponentEmpty}
      </p>
    </div>
  );
};
