<template>
    <div id="app">
        <div class="header">
            Weather
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text;
}

.header {
    height: 60px;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $primary;
    color: $white;
    font-weight: 600;
    font-size: 24px;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: $text;

        &.router-link-exact-active {
            color: $primary;
        }
    }
}
</style>
