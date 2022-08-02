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
}, import("vue").Data, ComponentData, {}, {
    cancel(): void;
    signal(signal: string): void;
    loadJobStatus(): void;
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
}>>, {
    tags: Record<string, any>;
}>;
export default _default;
