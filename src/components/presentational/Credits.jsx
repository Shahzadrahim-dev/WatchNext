function Credits({ credits, type, singular, plural }) {
  return (
    <div className="flex gap-2 mt-2">
      <p className="font-bold text-[#DB1819]">
        {credits?.[type]?.length > 1 ? plural : singular}
      </p>
      <p>
        {credits?.[type]?.length
          ? credits[type].join(", ")
          : "n/a"}
      </p>
    </div>
  );
}

export default Credits;
