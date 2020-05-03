import { shallowMount } from "@vue/test-utils";
import Tabs from "@/components/atoms/Tabs.vue";

const tabOptions = [
    {
        id: 1,
        label: "Search by location"
    },
    {
        id: 2,
        label: "Search by coordinates"
    }
];

describe("Tabs.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Tabs, {
            propsData: {
                tabItemList: tabOptions,
                selectedTabId: 2
            }
        });
    });

    it("Appropriate number of tabs are rendered", () => {
        expect(wrapper.findAll(".item-tab").length).toBe(2);
    });

    it("Tab select event is emitted onClick with appropriate value", () => {
        const handler = jest.fn();
        wrapper.vm.$on("tabSelect", handler);
        wrapper.findAll(".item-tab").wrappers[0].trigger("click");
        expect(handler).toHaveBeenCalledWith(1);
    });
});
