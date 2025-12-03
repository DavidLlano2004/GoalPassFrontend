import { Skeleton } from "@heroui/skeleton";
import React from "react";

export const SkeletonTicketsByMatch = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Skeleton className="rounded-lg w-[104px] h-[21px] bg-[#8C8C90]" />
        <Skeleton className="rounded-lg w-[63px] h-[21px] bg-[#8C8C90]" />
      </div>
      <Skeleton className="rounded-lg w-full h-2 my-2 bg-[#8C8C90]" />

      <Skeleton className="rounded-lg w-[90px] m-auto h-[21px] bg-[#8C8C90]" />
    </div>
  );
};
