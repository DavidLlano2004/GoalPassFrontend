import { Skeleton } from "@heroui/skeleton";

export const SkeletonTicketsByMatchUser = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <Skeleton className="rounded-lg w-[104px] h-[21px] bg-[#8C8C90]" />
        <Skeleton className="rounded-lg w-[63px] h-[21px] bg-[#8C8C90]" />
      </div>
      <Skeleton className="rounded-lg w-full h-2 my-2 bg-[#8C8C90]" />

      <Skeleton className="rounded-lg w-[90px] m-auto h-[21px] bg-[#8C8C90]" />
      <Skeleton className="w-[120px] h-[30px] rounded-lg m-auto bg-[#8C8C90] my-5" />
      <div className="flex flex-col justify-center items-center mt-4">
        <Skeleton className="w-[39.7px] h-[21px] rounded-lg m-auto bg-[#8C8C90] mb-2" />
        <Skeleton className="w-[100.38px] h-[39px] rounded-lg m-auto bg-[#8C8C90]" />
      </div>
    </div>
  );
};
