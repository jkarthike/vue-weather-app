<template>
    <div class="autocomplete-input">
        <input
            v-model="search"
            type="text"
            class="input-text"
            @input="onChange"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter"
        />
        <ul v-show="isOpen" class="autocomplete-results">
            <li
                v-for="(result, i) in results"
                :key="result.key"
                class="autocomplete-result"
                :class="{ 'is-active': i === arrowCounter }"
                @click="setResult(result)"
            >
                {{ result.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "AutocompleteInput",
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            isOpen: false,
            results: [],
            search: "",
            isLoading: false,
            arrowCounter: 0
        };
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        onChange() {
            // Is the data given by an outside ajax request?
            this.filterResults();
            this.isOpen = true;
            this.$emit("selectedValue", null);
        },
        filterResults() {
            // first uncapitalize all the things
            this.results = this.items.filter(item => {
                return (
                    item.name.toLowerCase().indexOf(this.search.toLowerCase()) >
                    -1
                );
            });
        },
        setResult(result) {
            this.search = result.name;
            this.isOpen = false;
            this.$emit("selectedValue", result);
        },
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.results[this.arrowCounter].name;
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        }
    }
};
</script>

<style scoped lang="scss">
.autocomplete-input {
    .input-text {
        font-size: 20px;
        width: 280px;
        box-sizing: border-box;
        border: 1px solid $light-grey;
        padding: 2px;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid $light-grey;
        height: 200px;
        overflow: auto;
        width: 280px;
        position: absolute;
        background: $white;
        z-index: 1;
        box-sizing: border-box;
        font-size: 20px;
    }

    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 5px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background: $light-green;
        color: $white;
    }
}
</style>
