import { Skeleton } from "@/components/ui/skeleton";
import CardGridContainer from "../presentational/CardGridContainer";

function CardSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="h-[200px] w-[136px] rounded-[5px] bg-gray-800" />
        <Skeleton
          className="h-[14px] w-[130px] rounded-[3px] bg-gray-800 mt-[.5rem]
            ml-[1px]"
        />
        <Skeleton
          className="h-[14px] w-[105px] rounded-[3px] bg-gray-800 mt-[.5rem]
            ml-[1px]"
        />
      </div>
    </>
  );
}

export default CardSkeleton;

/* figure out the whole key issue thing that react needs do we need a 3rd party library? */
