<template>
    <div class="weather-by-coordinates">
        <div class="input-field-container">
            <div class="row">
                <div class="column justify-left">
                    Latitue:
                </div>
                <div class="column justify-right">
                    <input
                        v-model="latitudeInput"
                        type="number"
                        class="input-text"
                        @input="$emit('changeLatitude', latitudeInput)"
                    />
                </div>
            </div>
            <div class="row">
                <div class="column justify-left">
                    Longitude:
                </div>
                <div class="column justify-right">
                    <input
                        v-model="longitudeInput"
                        type="number"
                        class="input-text"
                        @input="$emit('changeLongitude', longitudeInput)"
                    />
                </div>
            </div>
            <div class="row">
                <div class="column justify-center">
                    <Button type="primary" @click="$emit('submitClick')">
                        Go
                    </Button>
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
import WeatherInfo from "@/components/molecules/WeatherInfo.vue";

export default {
    name: "WeatherbyCoordinates",
    components: {
        Button,
        WeatherInfo
    },
    props: {
        currentWeather: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            latitudeInput: null,
            longitudeInput: null
        };
    }
};
</script>

<style scoped lang="scss">
.weather-by-coordinates {
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

    .input-text {
        font-size: 20px;
        width: 280px;
        box-sizing: border-box;
        border: 1px solid $light-grey;
        padding: 2px;
    }
}
</style>
