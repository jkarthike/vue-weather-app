<template>
    <div class="weather-info">
        <div class="location-name">{{ locationName }}</div>
        <img
            class="weather-image"
            :src="
                'http://openweathermap.org/img/wn/' +
                    info.weather[0].icon +
                    '@2x.png'
            "
        />
        <div class="main-temp">{{ Math.ceil(info.main.temp) }}&#176;C</div>
        <div class="high-low-temp">
            <div class="m-r-5">
                High {{ Math.ceil(info.main.temp_max) }}&#176;C
            </div>
            <div class="m-l-5">
                Low {{ Math.ceil(info.main.temp_min) }}&#176;C
            </div>
        </div>
        {{ info.weather[0].main }}
    </div>
</template>

<script>
export default {
    name: "WeatherInfo",
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    computed: {
        locationName() {
            return this.info && this.info.name
                ? this.info.name
                : "Location name unavailable !!!";
        }
    }
};
</script>

<style scoped lang="scss">
.weather-info {
    width: 100%;
    margin: 0 auto;

    .location-name {
        font-size: 24px;
    }

    .weather-image {
        margin-top: 10px;
        height: 150px;
        width: 150px;
        border: 0.2px solid $primary;
    }

    .main-temp {
        font-size: 72px;
    }

    .high-low-temp {
        display: flex;
        font-size: 18px;
        justify-content: center;
    }

    .m-l-5 {
        margin-left: 5px;
    }

    .m-r-5 {
        margin-right: 5px;
    }
}
</style>
