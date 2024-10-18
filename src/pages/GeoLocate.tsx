import { useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";

const GeoLocate = () => {
  const [countClicks, setCountClicks] = useState(0);

  const { isLoading, position, error, getPosition } = useGeoLocation();

  const handleBtnClick = () => {
    setCountClicks((count) => count + 1);
    getPosition();
  };

  const lat = position?.lat;
  const long = position?.long;

  return (
    <div>
      <button onClick={handleBtnClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && long && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${long}`}
          >
            {lat}, {long}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
};

export default GeoLocate;
