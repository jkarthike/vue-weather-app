import { shallowMount } from "@vue/test-utils";
import Button from "@/components/atoms/Button.vue";

describe("Button.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Button, {
            propsData: {
                type: "secondary"
            }
        });
    });

    it("Appropriate type of button is rendered", () => {
        expect(wrapper.find(".button").classes()).toContain("secondary");
    });

    it("click event is emitted onClick", () => {
        const handler = jest.fn();
        wrapper.vm.$on("click", handler);
        wrapper.find(".button").trigger("click");
        expect(handler).toHaveBeenCalled();
    });
});
