function InnerContainer({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export default InnerContainer;
