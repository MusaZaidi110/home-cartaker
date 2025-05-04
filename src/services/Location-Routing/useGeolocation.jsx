import { useState, useCallback } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setError(null); // clear previous error
      },
      (err) => {
        setError(err.message || "Location permission denied");
        setLocation(null); // clear previous location
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, error, getLocation };
};
