import { Button } from "@/components/ui/button";

function CardGridContainer({ children }) {
  return (
    <>
      <ul
        className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]
          justify-items-center gap-y-6 relative"
      >
        {children}
        <Button
          variant="secondary"
          className="absolute right-1 -bottom-[68px] w-30 h-10"
        >
          <span className="hover:opacity-80 text-[.95rem]">
            Auto Load
          </span>
        </Button>
      </ul>
    </>
  );
}

export default CardGridContainer;
