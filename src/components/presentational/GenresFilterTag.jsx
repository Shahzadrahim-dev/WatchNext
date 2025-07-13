import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
function GenresFilterTag({
  genre,
  isError,
  setGenre,
  type,
}) {
  return (
    <div className="flex">
      {genre && !isError && (
        <Button
          variant="secondary"
          className="pl-[.35rem] pr-[.3rem] pt-[0.16rem] pb-[0.18rem] mr-[8px]
            mb-[.5rem] rounded-[4px] bg-[#a90003]"
          onClick={() => {
            setGenre(null);
          }}
        >
          <span className="text-[.65rem]">
            {type}
            {genre.name}
          </span>
          <X size={13} />
        </Button>
      )}
    </div>
  );
}

export default GenresFilterTag;
