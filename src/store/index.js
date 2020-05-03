import Vue from "vue";
import Vuex from "vuex";
import { getCurrentWeather } from "../api/api-broker.js";
import { setStorage, getStorage } from "../utils/localstorage";
import CityList from "cities.json";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedCountry: null,
        cityList: [],
        selectedCity: null,
        currentWeather: null,
        selectedTabId: 1,
        latitude: null,
        longitude: null
    },
    mutations: {
        SET_SELECTED_TAB_ID(state, selectedTabId) {
            state.selectedTabId = selectedTabId;
        },
        SET_SELECTED_COUNTRY(state, selectedCountry) {
            state.selectedCountry = selectedCountry;
        },
        SET_SELECTED_CITY(state, selectedCity) {
            state.selectedCity = selectedCity;
        },
        SET_CURRENT_WEATHER(state, currentWeather) {
            state.currentWeather = currentWeather;
        },
        SET_SELECTED_LATITUDE(state, latitude) {
            state.latitude = latitude;
        },
        SET_SELECTED_LONGITUDE(state, longitude) {
            state.longitude = longitude;
        }
    },
    actions: {
        setSelectedTabId({ commit }, selectedTabId) {
            commit("SET_SELECTED_TAB_ID", selectedTabId);
            commit("SET_CURRENT_WEATHER", null);
        },
        setSelectedCountry({ commit }, selectedCountry) {
            commit("SET_SELECTED_COUNTRY", selectedCountry);
        },
        setSelectedCity({ commit }, selectedCity) {
            commit("SET_SELECTED_CITY", selectedCity);
        },
        setCurrentWeather({ commit }, currentWeather) {
            commit("SET_CURRENT_WEATHER", currentWeather);
        },
        async fetchCurrentWeather({ getters, dispatch }) {
            let _query = "";
            if (getters.selectedTabId === 1) {
                _query =
                    "?q=" +
                    getters.selectedCity.name +
                    "," +
                    getters.selectedCountry.name +
                    "&units=metric";
            } else {
                _query =
                    "?lat=" +
                    getters.latitude +
                    "&lon=" +
                    getters.longitude +
                    "&units=metric";
            }
            _query = _query.toLowerCase();
            if (!getStorage(_query)) {
                const response = await getCurrentWeather(_query);
                if (response.status === 200) {
                    const _data = response.data;
                    dispatch("setCurrentWeather", _data);
                    return setStorage(_query, _data);
                }
                throw new Error(response.status);
            } else {
                return dispatch("setCurrentWeather", getStorage(_query));
            }
        },
        setSelectedLatitude({ commit }, latitude) {
            commit("SET_SELECTED_LATITUDE", latitude);
        },
        setSelectedLongitude({ commit }, longitude) {
            commit("SET_SELECTED_LONGITUDE", longitude);
        }
    },
    getters: {
        selectedTabId: state => state.selectedTabId,
        cityList: state => {
            if (state.selectedCountry) {
                let _cityList = [...CityList];
                _cityList = _cityList.filter(
                    city => city.country === state.selectedCountry.key
                );
                return _cityList;
            }
            return null;
        },
        selectedCountry: state => state.selectedCountry,
        selectedCity: state => state.selectedCity,
        currentWeather: state => state.currentWeather,
        latitude: state => state.latitude,
        longitude: state => state.longitude
    }
});
