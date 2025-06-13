import { Skeleton } from "@/components/ui/skeleton";
import CardGridContainer from "../presentational/CardGridContainer";

function CardSkeleton() {
  return (
    <Skeleton className="h-[200px] w-[136px] rounded-[5px] bg-gray-800" />
  );
}

export default CardSkeleton;

/* figure out the whole key issue thing that react needs do we need a 3rd party library? */
