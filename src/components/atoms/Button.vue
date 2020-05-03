<template>
    <div class="button-container">
        <button :class="['button', type]" @click="$emit('click', $event)">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        type: {
            type: String,
            required: false,
            default: "primary"
        }
    }
};
</script>

<style scoped lang="scss">
.button-container {
    .button {
        padding: 10px 20px;
        border: 1px solid $primary;
        color: $white;
        background: $primary;
        border-radius: 4px;
        font-size: 14px;
        min-width: 100px;
        cursor: pointer;

        &.secondary {
            background: $white;
            color: $dark-grey;
        }
    }
}
</style>
