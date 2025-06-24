import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

function CardGridContainer({
  children,
  onLoadMore,
  isLoading,
  isError,
  hasData,
  isAutoLoad,
  setIsAutoLoad,
  isPageLimitExceeded,
  isSearchValid = true,
}) {
  const sentinelRef = useRef();

  useEffect(() => {
    if (
      !sentinelRef.current ||
      isLoading ||
      isError ||
      isPageLimitExceeded
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("intersected");
          onLoadMore();
        }
      },
      { rootMargin: "300px", threshold: 1 },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [
    onLoadMore,
    isLoading,
    isError,
    sentinelRef,
    isPageLimitExceeded,
  ]);

  return (
    <div>
      <ul
        className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]
          justify-items-center gap-y-6 relative pb-5"
      >
        {children}
      </ul>

      <div className="flex justify-end">
        {!isError &&
          hasData &&
          !isAutoLoad &&
          isSearchValid && (
            <Button
              variant="secondary"
              className="w-30 h-10"
              disabled={isLoading}
              onClick={() => {
                setIsAutoLoad((prev) => !prev);
              }}
            >
              <span className="hover:opacity-80 text-[.95rem]">
                Auto Load
              </span>
            </Button>
          )}
      </div>

      {isAutoLoad && (
        <div
          ref={sentinelRef}
          className="w-full bg-blue-600"
        />
      )}
    </div>
  );
}

export default CardGridContainer;
