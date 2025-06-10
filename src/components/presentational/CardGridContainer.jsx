function CardGridContainer({ children }) {
  return (
    <ul
      className="grid
        grid-cols-[repeat(auto-fill,minmax(150px,1fr))]
        justify-items-center gap-y-6"
    >
      {children}
    </ul>
  );
}

export default CardGridContainer;
