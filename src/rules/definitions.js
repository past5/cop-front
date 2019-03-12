import validator from 'validator';
const cloneDeep = require('lodash.clonedeep');

class Definitions {
  constructor() {
    this.defs = {};
    this.defs.isNumeric = (value, args) => {
      if (typeof value === 'number'){
        return true;
      }
      return validator.isNumeric(value);
    }
    this.defs.isNumericMin = (value, args) => {
      let success = false;
      if (this.defs.isNumeric(value, args)) {
        success = (args['min'] !== undefined) ? (value >= args['min']) : true;
      }
      return success;
    }
    this.defs.isNumericMax = (value, args) => {
      let success = false;
      if (this.defs.isNumeric(value, args)) {
        success = (args['max'] !== undefined) ? (value <= args['max']) : true;
      }
      return success;
    }
    this.defs.isAlphaNumeric = (value, args) => {
      let locale = (args['locale'] !== undefined) ? args['locale'] : 'en-US';
      return validator.isAlphanumeric(value, locale);
    }
    this.defs.isText = (value, args) => {
      return value.length > 0;
    }
    this.defs.isTextMin = (value, args) => {
      return (args['min'] !== undefined) ? validator.isLength(value, {min: args['min']}) : true;
    }
    this.defs.isTextMax = (value, args) => {
      return (args['max'] !== undefined) ? validator.isLength(value, {max: args['max']}) : true;
    }
    this.defs.isRegex = (value, args) => {
      return validator.matches(value, args['regex']);
    }
  }

  returnFunction(fun, value, args) {
    return this.defs[fun](value, args);
  }
}

export default Definitions;
