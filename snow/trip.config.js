window.SKI_TRIP = {
  destination: "Flaine",
  area: "The Grand Massif",
  departureDate: "2027-02-13T00:00:00+01:00",
  departureLabel: "Saturday, 13 February 2027",
  skiHireSheetUrl: "https://docs.google.com/spreadsheets/d/177XWoZ8xvHnpbnz4HpX3-E2BugvdC3K5wiNWQedjW5g",
  coordinates: { latitude: 46.006, longitude: 6.695, resortElevation: 1600, summitElevation: 2500 },
  resources: {
    weatherOpening: "https://www.flaine.com/en/weather-opening/",
    webcams: "https://www.flaine.com/en/webcams/",
    liveStatus: "https://www.grand-massif.com/en/infos-ouverture-pistes/",
    pisteMap: "https://www.grand-massif.com/en/trail-map/",
    skiPasses: "https://www.grand-massif.com/en/ski-offers/package-rates/",
    app: "https://www.grand-massif.com/en/grand-massif-app/"
  }
};

window.initialiseSkiTrip = async function initialiseSkiTrip(root = document) {
  const trip = window.SKI_TRIP;
  const text = (name, value) => root.querySelectorAll(`[data-weather="${name}"]`).forEach((element) => { element.textContent = value; });
  const number = (value, suffix = "") => Number.isFinite(value) ? `${Math.round(value)}${suffix}` : "—";
  const weatherRequest = (elevation) => {
    const query = new URLSearchParams({
      latitude: trip.coordinates.latitude,
      longitude: trip.coordinates.longitude,
      elevation,
      current: "temperature_2m,wind_speed_10m,wind_gusts_10m",
      daily: "temperature_2m_max,temperature_2m_min,snowfall_sum,wind_speed_10m_max",
      forecast_days: 5,
      timezone: "Europe/Paris",
      wind_speed_unit: "kmh"
    });
    return fetch(`https://api.open-meteo.com/v1/forecast?${query}`).then((response) => response.ok ? response.json() : Promise.reject(new Error("Weather unavailable")));
  };
  try {
    const [resort, summit] = await Promise.all([weatherRequest(trip.coordinates.resortElevation), weatherRequest(trip.coordinates.summitElevation)]);
    text("resort-temp", number(resort.current?.temperature_2m, "°"));
    text("summit-temp", number(summit.current?.temperature_2m, "°"));
    text("wind", number(summit.current?.wind_speed_10m, " km/h"));
    text("snowfall", Number.isFinite(resort.daily?.snowfall_sum?.[0]) ? `${resort.daily.snowfall_sum[0].toFixed(1)} cm` : "—");
    const time = resort.current?.time ? new Date(resort.current.time) : null;
    text("updated", time ? `Model update: ${time.toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })}` : "Model update time unavailable");
    root.querySelectorAll("[data-forecast]").forEach((element) => {
      element.innerHTML = (resort.daily?.time || []).slice(0, 5).map((date, index) => {
        const label = index === 0 ? "Today" : new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: "short" });
        const high = number(resort.daily.temperature_2m_max?.[index], "°");
        const low = number(resort.daily.temperature_2m_min?.[index], "°");
        const snow = resort.daily.snowfall_sum?.[index];
        return `<li><b>${label}</b><span>${high} / ${low}</span><small>${Number.isFinite(snow) ? `${snow.toFixed(1)} cm snow` : "Snow unavailable"}</small></li>`;
      }).join("");
    });
  } catch {
    text("updated", "Weather model unavailable — see the official mountain report.");
    root.querySelectorAll("[data-forecast]").forEach((element) => { element.hidden = true; });
  }
};

window.initialiseSkiCountdown = function initialiseSkiCountdown(root = document) {
  const target = new Date(window.SKI_TRIP.departureDate);
  const today = new Date();
  const days = Math.max(0, Math.ceil((Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000));
  root.querySelectorAll("[data-countdown]").forEach((element) => { element.textContent = String(days); });
};
