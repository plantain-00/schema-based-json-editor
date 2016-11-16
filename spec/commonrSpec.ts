import * as common from "../dist/common";

describe("getDefaultValue", () => {
    it("should return initial value if initial value exists and valid", () => {
        expect(common.getDefaultValue(true, { type: "string" }, "abc")).toEqual("abc");
        expect(common.getDefaultValue(false, { type: "string" }, "abc")).toEqual("abc");
    });

    it("should return undefined if no valid initial value and not required", () => {
        expect(common.getDefaultValue(false, { type: "string" }, 123)).toEqual(undefined);
        expect(common.getDefaultValue(false, { type: "string" }, undefined)).toEqual(undefined);
    });

    it("should return default value if no valid initial value and required", () => {
        expect(common.getDefaultValue(true, { type: "string", default: "abc" }, undefined)).toEqual("abc");

        expect(common.getDefaultValue(true, { type: "object", properties: {} }, undefined)).toEqual({});
        expect(common.getDefaultValue(true, { type: "array", items: { type: "string" } }, undefined)).toEqual([]);
        expect(common.getDefaultValue(true, { type: "number" }, undefined)).toEqual(0);
        expect(common.getDefaultValue(true, { type: "integer" }, undefined)).toEqual(0);
        expect(common.getDefaultValue(true, { type: "boolean" }, undefined)).toEqual(false);
        expect(common.getDefaultValue(true, { type: "string" }, undefined)).toEqual("");
        expect(common.getDefaultValue(true, { type: "null" }, undefined)).toEqual(null);

        expect(common.getDefaultValue(true, { type: "number", enum: [1, 2] }, undefined)).toEqual(1);
        expect(common.getDefaultValue(true, { type: "integer", enum: [1, 2] }, undefined)).toEqual(1);
        expect(common.getDefaultValue(true, { type: "string", enum: ["a", "b"] }, undefined)).toEqual("a");
    });
});
