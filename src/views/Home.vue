<template>
    <div class="home-page">
        <HomePage />
    </div>
</template>

<script>
import HomePage from "@/components/pages/HomePage.vue";

export default {
    name: "Home",
    components: {
        HomePage
    }
};
</script>

<style scoped lang="scss">
.home-page {
    max-width: 880px;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: 100vh;
    padding: 40px 20px;
}
</style>
