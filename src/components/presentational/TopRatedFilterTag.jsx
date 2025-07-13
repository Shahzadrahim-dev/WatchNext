import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
function TopRatedFilterTag({
  isTopRatedOn,
  isError,
  setIsTopRatedOn,
}) {
  return (
    <div className="flex justify-end">
      {isTopRatedOn && !isError && (
        <Button
          variant="secondary"
          className="pl-[.35rem] pr-[.3rem] pt-[0.16rem] pb-[0.18rem] mr-[8px]
            mb-[.5rem] rounded-[4px] bg-[#a90003]"
          onClick={() => {
            setIsTopRatedOn(false);
          }}
        >
          <span className="text-[.65rem]">Top Rated</span>
          <X size={13} />
        </Button>
      )}
    </div>
  );
}

export default TopRatedFilterTag;
