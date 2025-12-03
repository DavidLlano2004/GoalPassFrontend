import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";

export const SkeletonMatches = () => {
  return (
    <div className="grid place-items-center flex-1">
      <Spinner size="lg" color="white" label="Cargando..." />
    </div>
  );
};
