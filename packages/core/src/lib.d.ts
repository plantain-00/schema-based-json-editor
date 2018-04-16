declare module "lodash.tonumber" {
  function toNumber(value: any): number;
  export default toNumber;
}
declare module "lodash.tointeger" {
  function toInteger(value: any): number;
  export default toInteger;
}
declare module "lodash.isobject" {
  function isObject(obj: any): boolean;
  export default isObject;
}
declare module "lodash.isinteger" {
  function isInteger(value: number): boolean;
  export default isInteger;
}

declare interface Window {
    __extends: any;
    __decorate: any;
    __assign: any;
}
