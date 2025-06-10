function truncateTitle(title, maxLength = 20) {
  if (title.length <= maxLength) return title;
  const trimmed = title
    .slice(0, maxLength - 3)
    .trimEnd();
  return trimmed + "...";
}

export { truncateTitle };
