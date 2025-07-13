import { useParams } from "react-router-dom";

function MediaDetails() {
  const params = useParams();

  return <div>{params.id}</div>;
}

export default MediaDetails;
