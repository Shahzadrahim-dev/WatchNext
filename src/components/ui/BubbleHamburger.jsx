export default function BubbleHamburger({
  className = "",
  toggleSidebar,
}) {
  return (
    <div
      onClick={() => toggleSidebar()}
      className={`cursor-pointer w-[35px] h-[35px] rounded-full flex
        items-center justify-center
        [background:radial-gradient(circle_at_50%_55%,rgba(219,_24,_25,_0.9),rgba(219,_24,_25,_0.9)_40%,rgba(219,_24,_25,_0.8)_60%,rgba(219,_24,_25,_0.4))]
        animate-[var(--animate-float)] before:absolute
        before:[background:radial-gradient(circle_at_50%_55%,rgba(180,_15,_20,_1),rgba(180,_15,_20,_1)_40%,rgba(180,_15,_20,_0.85)_60%,rgba(180,_15,_20,_0.5))]
        before:inset-0 before:rounded-full before:opacity-0
        hover:before:opacity-100 before:transition-opacity
        before:duration-300 before:ease-in-out ${className}`}
    >
      <div className="w-[16px] h-[13px] flex flex-col justify-between z-1">
        <span className="w-[100%] h-[2px] bg-white block rounded-[2px]"></span>
        <span className="w-[100%] h-[2px] bg-white block rounded-[2px]"></span>
        <span className="w-[100%] h-[2px] bg-white block rounded-[2px]"></span>
      </div>
    </div>
  );
}
