<template>
    <div class="home-page-container">
        <Tabs
            class="tabs-wrapper"
            :tab-item-list="tabOptions"
            :selected-tab-id="selectedTabId"
            @tabSelect="handleTabSwitch($event)"
        />

        <div v-if="errorOccured" class="error-message">
            Location could not be found. Please try different location.
        </div>

        <WeatherbyLocation
            v-if="selectedTabId === 1"
            :country-list="countryList"
            :city-list="cityList"
            :current-weather="currentWeather"
            @selectedCountry="setSelectedCountry($event)"
            @selectedCity="setSelectedCity($event)"
            @submitClick="handleSubmitClick"
        />

        <WeatherbyCoordinates
            v-if="selectedTabId === 2"
            :current-weather="currentWeather"
            @changeLatitude="setSelectedLatitude($event)"
            @changeLongitude="setSelectedLongitude($event)"
            @submitClick="handleSubmitClick"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CountryList from "../../static/json/countryList";
import Tabs from "@/components/atoms/tabs.vue";
import WeatherbyLocation from "@/components/organisms/WeatherbyLocation.vue";
import WeatherbyCoordinates from "@/components/organisms/WeatherbyCoordinates.vue";

export default {
    name: "HomePage",
    components: {
        Tabs,
        WeatherbyLocation,
        WeatherbyCoordinates
    },
    data() {
        return {
            errorOccured: false,
            countryList: CountryList,
            tabOptions: [
                {
                    id: 1,
                    label: "Search by location"
                },
                {
                    id: 2,
                    label: "Search by coordinates"
                }
            ]
        };
    },
    computed: {
        ...mapGetters([
            "selectedTabId",
            "cityList",
            "selectedCounty",
            "selectedCity",
            "currentWeather",
            "latitude",
            "longitude"
        ])
    },
    methods: {
        ...mapActions([
            "setSelectedCountry",
            "setSelectedCity",
            "fetchCurrentWeather",
            "setSelectedTabId",
            "setSelectedLatitude",
            "setSelectedLongitude",
            "setCurrentWeather"
        ]),
        handleTabSwitch(selectedTabId) {
            this.errorOccured = false;
            this.setSelectedTabId(selectedTabId);
        },
        handleSubmitClick() {
            this.fetchCurrentWeather()
                .then(res => {
                    if (res) {
                        console.log(res);
                        this.errorOccured = false;
                    }
                })
                .catch(error => {
                    if (error) {
                        console.error(error);
                        this.errorOccured = true;
                        this.setCurrentWeather(null);
                    }
                });
        }
    }
};
</script>

<style scoped lang="scss">
.home-page-container {
    width: 100%;
    margin: 0 auto;

    .tabs-container {
        width: 50%;
        margin: auto;
        margin-bottom: 30px;
    }

    .error-message {
        color: $red;
        height: 60px;
    }
}
</style>
