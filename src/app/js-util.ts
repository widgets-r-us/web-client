export class JsUtil {

  public static hasSameProperties(type1: any, type2: any): boolean {
    for (const propertyName in type1) {
      if (typeof(type2[propertyName]) === 'undefined') {
        return false;
      }
    }
    return true;
  }

  static equals(x, y) {
    if (x === y)
      return true;
    // if both x and y are null or undefined and exactly the same
    if (!(x instanceof Object) || !(y instanceof Object))
      return false;

    let p;
    for (p in x) {
      if (!x.hasOwnProperty(p))
        continue;
      // other properties were tested using x.constructor === y.constructor
      if (!y.hasOwnProperty(p))
        return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined
      if (x[p] === y[p])
        continue;
      // if they have the same strict value or identity then they are equal
      if (typeof (x[p]) !== "object")
        return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal
      if (!this.equals(x[p], y[p]))
        return false;
    }
    for (p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
        return false;
    }
    return true;
  }

  public static isFalsy(object) {
    return !object
  }

}
