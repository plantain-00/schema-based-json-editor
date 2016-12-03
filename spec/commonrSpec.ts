import * as common from "../dist/common";

describe("getDefaultValue", () => {
    it("should work", () => {
        expect(common.getDefaultValue(true, { type: "string" }, "initial value")).toEqual("initial value");
        expect(common.getDefaultValue(false, { type: "string" }, "initial value")).toEqual("initial value");
        expect(common.getDefaultValue(true, { type: "string", default: "default value" }, "initial value")).toEqual("initial value");
        expect(common.getDefaultValue(false, { type: "string", default: "default value" }, "initial value")).toEqual("initial value");
        expect(common.getDefaultValue(true, { type: "string" }, undefined)).toEqual("");
        expect(common.getDefaultValue(false, { type: "string" }, undefined)).toEqual(undefined);
        expect(common.getDefaultValue(true, { type: "string", default: "default value" }, undefined)).toEqual("default value");
        expect(common.getDefaultValue(false, { type: "string", default: "default value" }, undefined)).toEqual(undefined);
    });
    it("should work too", () => {
        expect(common.getDefaultValue(false, { type: "string" }, 123)).toEqual(undefined);

        expect(common.getDefaultValue(true, { type: "object", properties: {} }, undefined)).toEqual({});
        expect(common.getDefaultValue(true, { type: "array", items: { type: "string" } }, undefined)).toEqual([]);
        expect(common.getDefaultValue(true, { type: "number" }, undefined)).toEqual(0);
        expect(common.getDefaultValue(true, { type: "integer" }, undefined)).toEqual(0);
        expect(common.getDefaultValue(true, { type: "boolean" }, undefined)).toEqual(false);

        expect(common.getDefaultValue(true, { type: "null" }, undefined)).toEqual(null);

        expect(common.getDefaultValue(true, { type: "number", enum: [1, 2] }, undefined)).toEqual(1);
        expect(common.getDefaultValue(true, { type: "integer", enum: [1, 2] }, undefined)).toEqual(1);
        expect(common.getDefaultValue(true, { type: "string", enum: ["a", "b"] }, undefined)).toEqual("a");
    });
});

describe("isSame", () => {
    it("should work", () => {
        expect(common.isSame(null, null)).toEqual(true);
        expect(common.isSame(1, 1)).toEqual(true);
        expect(common.isSame("abc", "abc")).toEqual(true);
        expect(common.isSame(true, true)).toEqual(true);
        expect(common.isSame(false, false)).toEqual(true);
        expect(common.isSame([1, 2], [1, 2])).toEqual(true);
        expect(common.isSame({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual(true);
        expect(common.isSame({ a: [1, 2], b: [2, 3] }, { a: [1, 2], b: [2, 3] })).toEqual(true);
        expect(common.isSame([{ a: 1, b: 2 }, { b: 3, c: 4 }], [{ a: 1, b: 2 }, { b: 3, c: 4 }])).toEqual(true);
    });
    it("should not work", () => {
        expect(common.isSame(null, 1)).toEqual(false);
        expect(common.isSame([1, 2], [2, 1])).toEqual(false);
    });
});

describe("getErrorMessageOfArray", () => {
    it("should be no error if no value", () => {
        expect(common.getErrorMessageOfArray(undefined, { type: "array", items: { type: "string" } }, common.defaultLocale)).toEqual("");
    });
    it("should show minItems error", () => {
        expect(common.getErrorMessageOfArray(["abc"], { type: "array", items: { type: "string" }, minItems: 2 }, common.defaultLocale)).toEqual("The length of the array must be >= 2.");
        expect(common.getErrorMessageOfArray(["abc"], { type: "array", items: { type: "string" }, minItems: 1 }, common.defaultLocale)).toEqual("");
    });
    it("should show uniqueItems error", () => {
        expect(common.getErrorMessageOfArray(["abc", "abc"], { type: "array", items: { type: "string" }, uniqueItems: true }, common.defaultLocale)).toEqual("The item in 0 and 1 must not be same.");
        expect(common.getErrorMessageOfArray(["abc", "abd"], { type: "array", items: { type: "string" }, uniqueItems: true }, common.defaultLocale)).toEqual("");
    });
});

describe("getErrorMessageOfNumber", () => {
    it("should be no error if no value", () => {
        expect(common.getErrorMessageOfNumber(undefined, { type: "number" }, common.defaultLocale)).toEqual("");
    });
    it("should show minimum error", () => {
        expect(common.getErrorMessageOfNumber(123, { type: "number", minimum: 124 }, common.defaultLocale)).toEqual("Value must be >= 124.");
        expect(common.getErrorMessageOfNumber(123, { type: "number", minimum: 123, exclusiveMinimum: true }, common.defaultLocale)).toEqual("Value must be > 123.");
        expect(common.getErrorMessageOfNumber(123, { type: "number", minimum: 122 }, common.defaultLocale)).toEqual("");
    });
    it("should show maximum error", () => {
        expect(common.getErrorMessageOfNumber(123, { type: "number", maximum: 122 }, common.defaultLocale)).toEqual("Value must be <= 122.");
        expect(common.getErrorMessageOfNumber(123, { type: "number", maximum: 123, exclusiveMaximum: true }, common.defaultLocale)).toEqual("Value must be < 123.");
        expect(common.getErrorMessageOfNumber(123, { type: "number", maximum: 124 }, common.defaultLocale)).toEqual("");
    });
    it("should show multipleOf error", () => {
        expect(common.getErrorMessageOfNumber(123, { type: "number", multipleOf: 2 }, common.defaultLocale)).toEqual("Value must be multiple value of 2.");
    });
});

describe("getErrorMessageOfString", () => {
    it("should be no error if no value", () => {
        expect(common.getErrorMessageOfString(undefined, { type: "string" }, common.defaultLocale)).toEqual("");
    });
    it("should show minLength error", () => {
        expect(common.getErrorMessageOfString("abc", { type: "string", minLength: 4 }, common.defaultLocale)).toEqual("Value must be at least 4 characters long.");
        expect(common.getErrorMessageOfString("abc", { type: "string", minLength: 3 }, common.defaultLocale)).toEqual("");
    });
    it("should show maxLength error", () => {
        expect(common.getErrorMessageOfString("abc", { type: "string", maxLength: 2 }, common.defaultLocale)).toEqual("Value must be at most 2 characters long.");
        expect(common.getErrorMessageOfString("abc", { type: "string", maxLength: 3 }, common.defaultLocale)).toEqual("");
    });
    it("should show pattern error", () => {
        expect(common.getErrorMessageOfString("abcd", { type: "string", pattern: "^[A-z]{3}$" }, common.defaultLocale)).toEqual("Value doesn't match the pattern ^[A-z]{3}$.");
        expect(common.getErrorMessageOfString("abc", { type: "string", pattern: "^[A-z]{3}$" }, common.defaultLocale)).toEqual("");
    });
});

describe("recordInvalidPropertiesOfObject", () => {
    it("should work when is valid", () => {
        const invalidProperties = ["a", "b"];
        common.recordInvalidPropertiesOfObject(invalidProperties, true, "b");
        expect(invalidProperties).toEqual(["a"]);
    });
    it("should work when is invalid", () => {
        const invalidProperties = ["a", "b"];
        common.recordInvalidPropertiesOfObject(invalidProperties, false, "c");
        expect(invalidProperties).toEqual(["a", "b", "c"]);
    });
});

describe("recordInvalidIndexesOfArray", () => {
    it("should work when is valid", () => {
        const invalidIndexes = [0, 2];
        common.recordInvalidIndexesOfArray(invalidIndexes, true, 2);
        expect(invalidIndexes).toEqual([0]);
    });
    it("should work when is invalid", () => {
        const invalidIndexes = [0, 2];
        common.recordInvalidIndexesOfArray(invalidIndexes, false, 1);
        expect(invalidIndexes).toEqual([0, 2, 1]);
    });
});

describe("isImageUrl", () => {
    it("should be true", () => {
        expect(common.isImageUrl("http://www.example.com/a.png")).toEqual(true);
        expect(common.isImageUrl("https://www.example.com/a.png")).toEqual(true);
        expect(common.isImageUrl("http://www.example.com/a.jpg")).toEqual(true);
        expect(common.isImageUrl("http://www.example.com/a.gif")).toEqual(true);
        expect(common.isImageUrl("http://www.example.com/a.bmp")).toEqual(true);
    });
    it("should be false", () => {
        expect(common.isImageUrl(undefined)).toEqual(false);
        expect(common.isImageUrl("abc")).toEqual(false);
        expect(common.isImageUrl("htt://www.example.com/a.png")).toEqual(false);
        expect(common.isImageUrl("http://www.example.com/a.html")).toEqual(false);
    });
});

describe("getLocale", () => {
    it("should be true", () => {
        expect(common.getLocale(undefined)).toEqual(common.defaultLocale);
        expect(common.getLocale("en")).toEqual(common.defaultLocale);
        expect(common.getLocale("zh-cn")).toEqual(common.locales["zh-cn"]);
        expect(common.getLocale("zh-CN")).toEqual(common.locales["zh-cn"]);
        expect(common.getLocale(common.defaultLocale)).toEqual(common.defaultLocale);
    });
});

describe("replaceProtocal", () => {
    it("should be true", () => {
        expect(common.replaceProtocal("http://example/a.png")).toEqual("https://example/a.png");
        expect(common.replaceProtocal("https://example/a.png")).toEqual("https://example/a.png");
        expect(common.replaceProtocal("ws://example/a.png")).toEqual("ws://example/a.png");
    });
});

describe("findTitle", () => {
    it("should be true", () => {
        expect(common.findTitle(undefined)).toEqual(undefined);
        expect(common.findTitle({ a: "b" })).toEqual("b");
        expect(common.findTitle({ a: 1 })).toEqual(undefined);
        expect(common.findTitle({ a: "", b: "c" })).toEqual("c");
        expect(common.findTitle({ a: "bbbbbcccccdddddeeeeeffff" })).toEqual("bbbbbcccccdddddeeeee...");
        expect(common.findTitle({ a: "bbbbbcccccdddddeeeeefff" })).toEqual("bbbbbcccccdddddeeeeefff");
    });
});

describe("getTitle", () => {
    it("should be true", () => {
        expect(common.getTitle(undefined)).toEqual("");
        expect(common.getTitle(0, 1)).toEqual("0");
        expect(common.getTitle(null, 0, 1)).toEqual("0");
    });
});
