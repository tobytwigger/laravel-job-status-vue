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
    method: {
        type: StringConstructor;
        required: false;
        validator: (val: unknown) => boolean;
        default: string;
    };
}, import("vue").Data, ComponentData, {
    defaultSlotProperties(): DefaultProps | null;
}, {
    setUpObserver(): void;
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
    method: {
        type: StringConstructor;
        required: false;
        validator: (val: unknown) => boolean;
        default: string;
    };
}>>, {
    method: string;
    tags: Record<string, any>;
}>;
export default _default;
