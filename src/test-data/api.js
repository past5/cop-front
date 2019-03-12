import EdProducts from './ed-products';

const apiFile = {
  EdProducts,
};

const copApiUrl = 'http://localhost:9999/cop-api/';

export default {
  get: function(path, config) {
    let apiMatch = path.replace(copApiUrl, '').replace('/', '');
    if (apiFile[apiMatch] !== undefined) {
      return Promise.resolve(apiFile[apiMatch].get(config));
    }
    else {
      return this.handleError('Undefined Test API');
    }
  },
  put: function(path, data, config) {
    let apiMatch = path.replace(copApiUrl, '').replace('/', '');
    if (apiFile[apiMatch] !== undefined) {
      return Promise.resolve(apiFile[apiMatch].put(data, config));
    }
    else {
      return this.handleError('Undefined Test API');
    }
  },
  post: function(path, data, config) {
    let apiMatch = path.replace(copApiUrl, '').replace('/', '');
    if (apiFile[apiMatch] !== undefined) {
      return Promise.resolve(apiFile[apiMatch].post(data, config));
    }
    else {
      return this.handleError('Undefined Test API');
    }
  },
  delete: function(path, config) {
    let apiMatch = path.replace(copApiUrl, '').replace('/', '');
    if (apiFile[apiMatch] !== undefined) {
      return Promise.resolve(apiFile[apiMatch].delete(config));
    }
    else {
      return this.handleError('Undefined Test API');
    }
  },
  handleError: function(response){
    return Promise.reject(response);
  },
};
