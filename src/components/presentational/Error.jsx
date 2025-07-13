import errorSVG from "../../assets/errorSVG.svg";

function Error() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src={errorSVG} className="h-25 w-25" />
        <h2>
          There seems to be a problem. Our team is working
          on it.
        </h2>
      </div>
    </>
  );
}

export default Error;
