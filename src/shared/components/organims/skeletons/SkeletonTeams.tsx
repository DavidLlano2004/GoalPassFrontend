import { Skeleton } from "@heroui/skeleton";

export const SkeletonTeams = () => {
  return (
    <div className="overflow-y-auto flex-1 p-6 flex flex-col w-full max-w-[1123px] mx-auto">
      <div className="flex items-center justify-between sm:flex-nowrap flex-wrap mb-4">
        <div className="gap-2 flex flex-col">
          <Skeleton className="rounded-xl w-[234px] h-[30px] bg-[#8C8C90]" />
          <Skeleton className="rounded-xl w-[234px] h-[30px] bg-[#8C8C90]" />
        </div>
        <div className="sm:mt-0 mt-6 sm:w-auto w-full">
          <Skeleton className="rounded-[15px] min-w-[190px] w-full h-[50px] bg-[#8C8C90]" />
        </div>
      </div>
    </div>
  );
};
