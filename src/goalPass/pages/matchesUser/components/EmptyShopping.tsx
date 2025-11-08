import React from "react";

export const EmptyShopping = () => {
  return (
    <div className="flex-1 grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-[120px] h-[120px] rounded-full bg-gray-2-custom grid place-items-center">
          <i className="fi fi-tr-cart-shopping-fast text-[50px] text-white flex"></i>
        </div>
        <p className=" font-light text-[14px]">
          Selecciona una ubicación para continuar
        </p>
      </div>
    </div>
  );
};
