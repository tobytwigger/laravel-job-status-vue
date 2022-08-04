import { AssociativeObject, ComponentData, DefaultProps } from "../types/core";
declare const _default: import("vue/types/v3-define-component").DefineComponent<{
    jobAlias: {
        type: StringConstructor;
        required: true;
    };
    tags: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    polling: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, import("vue").Data, ComponentData, {
    defaultSlotProperties(): DefaultProps | null;
}, {
    cancel(): Promise<null> | null;
    signal(signal: string, cancelJob?: boolean, parameters?: AssociativeObject): Promise<null> | null;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    jobAlias: {
        type: StringConstructor;
        required: true;
    };
    tags: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    polling: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    tags: Record<string, any>;
    polling: boolean;
}>;
export default _default;
