import { useState } from "react";

type Position = {
  lat: number;
  long: number;
};

const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, position, error, getPosition };
};

export default useGeoLocation;
