window.FLAINE_2027 = {
  destination: "Flaine",
  area: "The Grand Massif",
  departureDate: "2027-02-13T00:00:00+01:00",
  departureLabel: "Saturday, 13 February 2027",
  sheetUrl: "https://docs.google.com/spreadsheets/d/177XWoZ8xvHnpbnz4HpX3-E2BugvdC3K5wiNWQedjW5g",
  weather: { latitude: 46.006, longitude: 6.695, resortElevation: 1600, summitElevation: 2500 },
  resources: {
    weatherOpening: "https://www.flaine.com/en/weather-opening/",
    webcams: "https://www.flaine.com/en/webcams/",
    liveStatus: "https://www.grand-massif.com/en/infos-ouverture-pistes/",
    pisteMap: "https://www.grand-massif.com/en/trail-map/",
    skiPasses: "https://www.grand-massif.com/en/ski-offers/package-rates/",
    app: "https://www.grand-massif.com/en/grand-massif-app/"
  }
};

window.initialiseFlaineWeather = async function initialiseFlaineWeather(root = document) {
  const config = window.FLAINE_2027;
  const assign = (name, value) => root.querySelectorAll(`[data-weather="${name}"]`).forEach((element) => { element.textContent = value; });
  const format = (value, unit = "") => Number.isFinite(value) ? `${Math.round(value)}${unit}` : "—";
  const endpoint = (elevation) => new URL("https://api.open-meteo.com/v1/forecast");
  const request = (elevation) => {
    const url = endpoint(elevation);
    url.search = new URLSearchParams({
      latitude: config.weather.latitude,
      longitude: config.weather.longitude,
      elevation,
      current: "temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,snowfall",
      daily: "temperature_2m_max,temperature_2m_min,snowfall_sum,wind_speed_10m_max",
      forecast_days: 5,
      timezone: "Europe/Paris",
      wind_speed_unit: "kmh"
    });
    return fetch(url).then((response) => response.ok ? response.json() : Promise.reject(new Error("weather unavailable")));
  };
  try {
    const [resort, summit] = await Promise.all([request(config.weather.resortElevation), request(config.weather.summitElevation)]);
    assign("resort-temp", format(resort.current?.temperature_2m, "°"));
    assign("summit-temp", format(summit.current?.temperature_2m, "°"));
    assign("wind", format(summit.current?.wind_speed_10m, " km/h"));
    assign("snowfall", Number.isFinite(resort.daily?.snowfall_sum?.[0]) ? `${resort.daily.snowfall_sum[0].toFixed(1)} cm` : "—");
    assign("updated", resort.current?.time ? `Model update: ${new Date(resort.current.time).toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })}` : "Model update time unavailable");
    root.querySelectorAll("[data-forecast]").forEach((element) => {
      element.innerHTML = (resort.daily?.time || []).slice(0, 5).map((date, index) => {
        const label = index === 0 ? "Today" : new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: "short" });
        const snow = resort.daily.snowfall_sum?.[index];
        const high = resort.daily.temperature_2m_max?.[index];
        const low = resort.daily.temperature_2m_min?.[index];
        return `<li><b>${label}</b><span>${format(high, "°")} / ${format(low, "°")}</span><small>${Number.isFinite(snow) ? `${snow.toFixed(1)} cm snow` : "Snow unavailable"}</small></li>`;
      }).join("");
    });
  } catch {
    assign("updated", "Weather model unavailable — see the official mountain report.");
    root.querySelectorAll("[data-forecast]").forEach((element) => { element.hidden = true; });
  }
};

window.initialiseFlaineCountdown = function initialiseFlaineCountdown(root = document) {
  const target = new Date(window.FLAINE_2027.departureDate);
  const today = new Date();
  const days = Math.max(0, Math.ceil((Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000));
  root.querySelectorAll("[data-countdown]").forEach((element) => { element.textContent = String(days); });
};
