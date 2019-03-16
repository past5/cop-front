import Definitions from './definitions';
const cloneDeep = require('lodash.clonedeep');

class InputRules {
  constructor(rulesLocalization) {
    this.definitions = new Definitions();

    this.SUCCESS = 'success';
    this.ERROR = 'error';
    this.WARNING = 'warning';
    this.BLANK = '';

    this.convertIntegers = false;

    if(rulesLocalization !== undefined) {
      this.rulesLocalization = rulesLocalization;
    }

    this.errors = {};
    this.warnings = {};
    this.rulesStates = {};
    this.requiredInputs = {};
    this.requiredInputsIfNotBlank = {};
    this.requiredDisabled = true;
    this.unvalidated = false;
    this.execArr = [];
    this.nameToRulesMap = {};
  
    return this;
  }

  convertInts() {
    this.convertIntegers = true;
    return this;
  }

  checkField(id, value ) {
    let name = id;
    let ruleSet = {};
    let clientOpts = {};

    if(this.convertIntegers && Number.isInteger(value)) {
      value = value.toString();
    }
  
    if (this.nameToRulesMap[name] === undefined) {
      this.createNewRuleSet(name, name);
    }

    if(this.nameToRulesMap && this.nameToRulesMap[name]) {
      ruleSet = this.nameToRulesMap[name];
    }

    Object.keys(ruleSet).forEach((rule) => {
      if(ruleSet.hasOwnProperty(rule)) {
        let ruleSetName = rule;
        if (Array.isArray(ruleSet[rule].opts) && ruleSet[rule].opts.length > 0) {
          ruleSet[rule].opts.forEach((option) => {
            clientOpts = option;
            this.switchRules(name, ruleSetName, value, clientOpts);
          });
        } else {
          this.switchRules(name, ruleSetName, value, clientOpts);
        }
      }
    });

    return this.execRules();
  }

  switchRules(name, ruleSetName, value, clientOpts) {
    switch(ruleSetName) {
      case 'Numeric':
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isNumericMin', this.ERROR, 'NUMERICMIN'));
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isNumericMax', this.ERROR, 'NUMERICMAX'));
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isNumeric', this.ERROR, 'NUMERIC'));
        break;
      case 'AlphaNumeric':
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isTextMin', this.ERROR, 'TEXTMIN'));
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isTextMax', this.ERROR, 'TEXTMAX'));
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isAlphaNumeric', this.ERROR, 'ALPHANUMERIC'));
        break;
      case 'Text':
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isTextMin', this.ERROR, 'TEXTMIN'));
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isTextMax', this.ERROR, 'TEXTMAX'));
        this.execArr.push(this.addContext(name, value, clientOpts, {}, 'isText', this.ERROR, 'ALPHANUMERIC'));
        break;
      case 'Regex':
        this.execArr.push(this.addContext(name, value, clientOpts, {regex: '^$'}, 'isRegex', clientOpts['warning'] === true ? this.WARNING : this.ERROR, 'REGEX'));
        break;
      default:
        break;
    }
  }

  addContext(name, value, opts, defOpts, func, returnType, errMsg) {
    let contextParams = {};
    contextParams['id'] = name;
    contextParams['value'] = value ? value : '';
    contextParams['opt'] = (opts !== undefined) ? opts : {};
    Object.keys(defOpts).forEach((defaultKey) => {
      if (contextParams.opt[defaultKey] === undefined) {
        contextParams.opt[defaultKey] = defOpts[defaultKey];
      }
    });
    contextParams['func'] = func;
    contextParams['return'] = returnType;
  //  let msgName = (contextParams.opt['name'] !== undefined) ? contextParams.opt['name'] : name;
    contextParams['errorMessage'] = (opts !== undefined && opts['message'] !== undefined ? opts['message']: this.replaceString(name, opts, errorMessages[errMsg]));
    return contextParams;
  }

  replaceString(name, opts, replacedString) {
    const replace = ['id', 'min', 'max', 'array'];

    if (this.rulesLocalization !== undefined) {
      name = this.rulesLocalization[name];
    }

    const replacement = [name, opts['min'], opts['max'], opts['array']];
    for(let i = 0; i < replace.length; i++) {
      replacedString = replacedString.replace(new RegExp('{' + replace[i] + '}', 'gi'), replacement[i]);
    }
    return replacedString;
  }

  execRules() {
    let currentFun, id, value;
    let error = false;
    let warning = false;

    while ((currentFun = this.execArr.shift()) !== undefined) {
      id = currentFun.id;
      value = currentFun.value;

      if (!this.definitions.returnFunction(currentFun.func, value, currentFun.opt)) {
        (this.addErrorOrWarning(id, currentFun.errorMessage, currentFun.return) === this.ERROR) ? error = true : warning = true;
      }
    }

    return this.getErrorState(id, value, error, warning);
  }

  addOptions(name, opts, rule = undefined) {
    if (this.nameToRulesMap[name] === undefined) {
      this.createNewRuleSet(name, name);
    }

    if (rule !== undefined
      && this.nameToRulesMap[name] !== undefined
      && this.nameToRulesMap[name][rule] !== undefined) {
      if (this.nameToRulesMap[name][rule]['opts'] === undefined) {
        this.nameToRulesMap[name][rule]['opts'] = [];
      }
      this.nameToRulesMap[name][rule]['opts'].push(cloneDeep(opts));
      return this;
    }

    let thisRule = Object.keys(this.nameToRulesMap[name])[0];

    if (this.nameToRulesMap[name] !== undefined
      && this.nameToRulesMap[name][thisRule] !== undefined) {
      if (this.nameToRulesMap[name][thisRule]['opts'] === undefined) {
        this.nameToRulesMap[name][thisRule]['opts'] = [];
      }
      this.nameToRulesMap[name][thisRule]['opts'].push(cloneDeep(opts));
    }

    return this;
  }

  addRuleset(name, RulesetId) {
    this.createNewRuleSet(name, RulesetId);
    return this;
  }

  deleteRuleSet(name){
    if ((this.nameToRulesMap[name] !== undefined)) {
      delete this.nameToRulesMap[name];
    }
  }

  createNewRuleSet(name, RulesetId) {
    if ((this.nameToRulesMap[name] === undefined)) {
      this.nameToRulesMap[name] = {};
    }

    this.nameToRulesMap[name][RulesetId] = {};
    this.nameToRulesMap[name][RulesetId]['opts'] = [];
  }

  getErrorState(id, value, error, warning) {
    if (error) {
      if(value || !(id in this.requiredInputsIfNotBlank)) {
        this.requiredInputs[id] = value;
        return this.ERROR;
      }
    }

    this.removeError(id);
    delete this.requiredInputs[id];

    if(!value && (id in this.requiredInputsIfNotBlank)) {
      delete this.rulesStates[id];
      return this.BLANK;
    }

    if (warning) {
      return this.WARNING;
    }

    this.removeWarning(id);

    return this.SUCCESS;
  }

  setOptionalFields(optionalFields) {
    this.requiredInputsIfNotBlank = optionalFields;
    return this;
  }

  setRequiredInputs(requiredInputs, checkMinLength=true) {
    this.requiredInputs = requiredInputs;
    this.checkRequiredFieldValues(checkMinLength);
    return this;
  }

  checkRequiredFieldValues(checkMinLength=true, excluded) {
    let keys = Object.keys(this.requiredInputs);
    if (keys.length < 1) {
      this.requiredDisabled = false;
    }
    for (let key of keys) {
      if (excluded !== undefined) {
        if (excluded[key] === true) {
          continue;
        }
      }
      if (!checkMinLength || (this.requiredInputs[key] && this.requiredInputs[key].length > 0)) {
        this.updateRulesStates(key, this.requiredInputs[key]);
      }
    }
  }

  getErrorMessage(ids) {
    if(!Array.isArray(ids)){
      ids = [ids];
    }
    let msgText = '';
    let msgType = null;

    ids.forEach(id => {
      if (msgType !== this.ERROR) {
        let newMsgType = this.getRulesState(id);
        if (newMsgType === this.ERROR) {
          msgType = this.ERROR;
          if (this.errors !== undefined) {
            msgText = this.errors[id];
          }
        }
        if ((msgType !== this.WARNING) && (newMsgType === this.WARNING)) {
          msgType = this.WARNING;
          if (this.warnings !== undefined) {
            msgText = this.warnings[id];
          }
        }
      }
    });

    return msgText;
  }

  getFirstErrorMessage() {
    let firstMessage;
    if (this.errors!==undefined) {
      firstMessage = this.errors[Object.keys(this.errors)[0]];
    }

    if ((firstMessage===undefined) && (this.warnings!==undefined)) {
      firstMessage = this.warnings[Object.keys(this.warnings)[0]];
    }
    return firstMessage===undefined ? '' : firstMessage;
  }

  addErrorOrWarning(id, message, ret) {
    if (ret===this.ERROR) {
      this.addError(id, message);
    }

    if (ret===this.WARNING) {
      this.addWarning(id, message);
    }

    return ret;
  }

  addWarning( id, warning ) {
    this.warnings[id] = warning;
  }

  removeWarning( id ) {
    if (this.warnings[id] !== undefined) {
      delete this.warnings[id];
    }
  }

  addError( id, error ) {
    this.errors[id] = error;
  }

  removeError( id ) {
    if (this.errors[id] !== undefined) {
      delete this.errors[id];
    }
  }

  resetRulesState(ids) {
    if(!Array.isArray(ids)){
      ids = [ids];
    }

    ids.forEach(id => {
      this.rulesStates[id] = null;
      this.removeWarning(id);
      this.removeError(id);
    });

    this.unvalidated = false;
    let keys = Object.keys(this.rulesStates);
    for (let key of keys) {
      if (this.rulesStates[key] === 'error') {
        this.unvalidated = true;
        break;
      }
    }
  }

  getRulesState(ids, includeSuccess=true) {
    if(!Array.isArray(ids)){
      ids = [ids];
    }
    let state = null;

    ids.forEach(id => {
      if (this.rulesStates[id] === this.ERROR) {
        state = this.ERROR;
      }
      if ((this.rulesStates[id] === this.WARNING) && (state !== this.ERROR)) {
        state = this.WARNING;
      }
      if ((includeSuccess !== undefined) && (includeSuccess === true) && (this.rulesStates[id] === this.SUCCESS)
        && (state !== this.ERROR) && (state !== this.WARNING)) {
        state = this.SUCCESS;
      }
    });

    return state;
  }

  checkIfRequiredSucceeded() {
    return (Object.keys(this.requiredInputs).length === 0 && this.requiredInputs.constructor === Object);
  }

  updateRulesStates(id, value) {
    this.rulesStates[id] = this.checkField(id, value);
    this.requiredDisabled = !this.checkIfRequiredSucceeded();

    this.unvalidated = false;
    let keys = Object.keys(this.rulesStates);
    for (let key of keys) {
      if (this.rulesStates[key] === 'error') {
        this.unvalidated = true;
        break;
      }
    }
  }

  static checkIfIndexSelected(index) {
    let disabled = true;

    (index !== undefined && index>-1) ? disabled = false: disabled = true;

    return disabled;
  }
}

const errorMessages = {
  'NUMERIC': '{id} must be a number',
  'NUMERICMIN': '{id} must be at least {min}',
  'NUMERICMAX': '{id} cannot be greater than {max}',
  'ALPHANUMERIC': '{id} must be alphanumeric character',
  'TEXT': '{id} must be text',
  'TEXTMIN': '{id} is less than {min} characters',
  'TEXTMAX': '{id} exceeds {max} characters',
  'REGEX': '{id} is not in correct format',
};

export default InputRules;
