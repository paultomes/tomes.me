# Flaine 2027 source review

The existing page is a small, dependency-free Avoriaz 2026 page. It has a
private Google Sheet link, a countdown, a client-side Open-Meteo request and
five-day forecast. The Sheet URL is retained unchanged; it remains protected by
Google's own authentication and is never fetched by this site.

Verified public sources for the new experience:

- [Flaine weather and opening report](https://www.flaine.com/en/weather-opening/)
  is the authoritative place to send visitors for resort and upper-mountain
  conditions, snow cover, pistes and lifts.
- [Flaine webcams](https://www.flaine.com/en/webcams/) provides official views
  including Grandes Platières, Aup de Véran, Désert Blanc, Véret and the resort.
- [Grand Massif live openings](https://www.grand-massif.com/en/infos-ouverture-pistes/)
  provides official piste/lift status. It is linked rather than scraped because
  the public page is the reliable, maintained source.
- [Grand Massif piste map](https://www.grand-massif.com/en/trail-map/) is the
  live destination for the annual map; its site says the 2026–27 map will be
  published later, so no older map is embedded as if it were current.
- [Official pass information](https://www.grand-massif.com/en/ski-offers/package-rates/)
  is linked without repeating a time-sensitive promotion or discount.
- [Official Grand Massif app](https://www.grand-massif.com/en/grand-massif-app/)
  provides interactive mapping, weather, openings and webcams.
- [Open-Meteo forecast documentation](https://open-meteo.com/en/docs) supports
  lightweight no-key forecast calls and elevation downscaling. It is a model,
  not an official mountain observation, so it is labelled accordingly.

The current official Flaine ski-area page states winter 2026–27 opening dates
of 5 December 2026–18 April 2027 for Flaine (with snow-condition caveats), so
the 13 February 2027 trip falls within the published operating season.
