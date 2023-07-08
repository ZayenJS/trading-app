/* eslint-disable no-extend-native */
export abstract class StringEnhancer {
  public static enhance(str: StringConstructor) {
    if (!str.prototype.ucfirst) {
      str.prototype.ucfirst = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
      };
    }
  }
}
