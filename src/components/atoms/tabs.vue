<template>
    <div class="tabs-container">
        <div
            v-for="(tab, i) in tabItemList"
            :key="i"
            :class="['item-tab', { selected: tab.id === selectedTabId }]"
            @click="$emit('tabSelect', tab.id)"
        >
            {{ tab.label }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        tabItemList: {
            type: Array,
            required: true
        },
        selectedTabId: {
            type: Number,
            required: true
        }
    }
};
</script>

<style scoped lang="scss">
.tabs-container {
    display: flex;
    flex-wrap: wrap;

    .item-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $light-grey;
        width: 200px;
        font-size: 18px;
        background: $white;
        height: 40px;
        color: $dark-grey;
        cursor: pointer;

        &.selected {
            background: $primary;
            color: $white;
        }
    }
}
</style>
