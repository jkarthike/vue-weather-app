<template>
    <div class="weather-by-location">
        <div class="input-field-container">
            <div class="row">
                <div class="column justify-left">Country:</div>
                <div class="column justify-right">
                    <AutoCompleteInput
                        :items="countryList"
                        @selectedValue="$emit('selectedCountry', $event)"
                    />
                </div>
            </div>
            <div class="row">
                <div class="column justify-left">City:</div>
                <div class="column justify-right">
                    <AutoCompleteInput
                        :items="cityList"
                        @selectedValue="$emit('selectedCity', $event)"
                    />
                </div>
            </div>
            <div class="row">
                <div class="column justify-center">
                    <Button type="primary" @click="$emit('submitClick')"
                        >Go</Button
                    >
                </div>
            </div>
            <div v-if="currentWeather" class="row">
                <div class="column">
                    <WeatherInfo :info="currentWeather" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/atoms/Button.vue";
import AutoCompleteInput from "@/components/molecules/AutocompleteInput.vue";
import WeatherInfo from "@/components/molecules/WeatherInfo.vue";

export default {
    name: "WeatherbyLocation",
    components: {
        Button,
        AutoCompleteInput,
        WeatherInfo
    },
    props: {
        countryList: {
            type: Array,
            required: true
        },
        cityList: {
            type: Array,
            required: false,
            default: null
        },
        currentWeather: {
            type: Object,
            required: false,
            default: null
        }
    }
};
</script>

<style scoped lang="scss">
.weather-by-location {
    .input-field-container {
        width: 50%;
        margin: 0 auto;
        font-size: 18px;

        .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            margin-top: 40px;

            &:first-child {
                margin-top: 0;
            }
        }

        .column {
            display: flex;
            flex-basis: 100%;
            flex: 1;
            align-items: center;

            &.justify-left {
                justify-content: flex-start;
            }

            &.justify-center {
                justify-content: center;
            }

            &.justify-right {
                justify-content: flex-end;
            }
        }
    }

    .m-l-5 {
        margin-left: 5px;
    }

    .m-r-5 {
        margin-right: 5px;
    }
}
</style>
