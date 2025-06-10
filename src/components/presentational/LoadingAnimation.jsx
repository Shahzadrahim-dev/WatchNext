function LoadingAnimation() {
  return (
    <div
      className="animate-spin inline-block size-[4.5em] border-6
        border-current border-t-transparent text-[#f9fafc]
        rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingAnimation;
