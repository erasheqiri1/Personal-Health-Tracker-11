import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const OPEN_WEATHER_API_KEY = "a53564ca78a5eb1e44612c01f6485a43";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(null);

        let latitude;
        let longitude;
        let cityFromIP = null;

        if (Platform.OS === "web") {
          const geoRes = await fetch("https://ipapi.co/json/");
          if (!geoRes.ok) {
            throw new Error("Gabim gjatë marrjes së lokacionit (IP)");
          }
          const geoData = await geoRes.json();
          latitude = geoData.latitude;
          longitude = geoData.longitude;
          cityFromIP = geoData.city;
        } else {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setWeatherError("Leja për lokacion u refuzua");
            return;
          }

          const position = await Location.getCurrentPositionAsync({});
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }

        if (!latitude || !longitude) {
          throw new Error("Koordinatat nuk u gjetën");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Gabim gjatë marrjes së motit");
        }

        const data = await res.json();

        if (Platform.OS === "web" && cityFromIP && !data.name) {
          data.name = cityFromIP;
        }

        setWeather(data);
      } catch (err) {
        console.log("WEATHER ERROR:", err);
        setWeatherError(err.message || "Gabim i panjohur");
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, weatherLoading, weatherError };
}
