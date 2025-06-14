function Container({ children }) {
  return (
    <div className="mx-auto max-w-screen-xl px-[1rem] pt-[1rem] min-h-[100vh]">
      {children}
    </div>
  );
}

export default Container;
