export const USA_QUAKE_API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson"

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

// EUROPE EARTH QUAKES
export const EMSC_API_URL = `https://www.seismicportal.eu/fdsnws/event/1/query?format=json&minlatitude=36&maxlatitude=70&minlongitude=-30&maxlongitude=50&start=${
	yesterday.toISOString().split("T")[0]
}&end=${new Date().toISOString().split("T")[0]}`
