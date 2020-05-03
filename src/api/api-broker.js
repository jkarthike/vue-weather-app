import Axios from "axios";

const _endPointRoot = process.env.VUE_APP_OPEN_WEATHER_ROOT;
const _appKey = process.env.VUE_APP_OPEN_WEATHER_API_KEY;

export async function getCurrentWeather(query) {
    const response = await Axios.get(
        _endPointRoot + query + "&appid=" + _appKey
    );
    return response;
}
