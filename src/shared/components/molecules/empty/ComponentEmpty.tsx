import React from "react";

interface Props {
  textComponentEmpty: string;
}

export const ComponentEmpty = ({
  textComponentEmpty,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <i className="fi fi-tr-drawer-empty text-[56px] text-white flex gradient-icon"></i>
      <p className="text-[18px] font-bold">{textComponentEmpty}</p>
    </div>
  );
};
