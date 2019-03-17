import axios from 'axios';

export const apiPathUrl = 'https://copapi.appspot.com/api/v1/';

export default {
  get: function(path) {
    return axios.get(apiPathUrl + path)
      .then(function (response) {
        return response;
      })
      .catch(response=> {
        return this.handleError(response);
      });
  },
  put: function(path, data) {
    return axios.put(apiPathUrl + path, data)
      .then(function (response) {
        return response;
      })
      .catch(response=> {
        return this.handleError(response);
      });
  },
  post: function(path, data) {
    return axios.post(apiPathUrl + path, data)
      .then(function (response) {
        return response;
      })
      .catch(response=> {
        return this.handleError(response);
      });
  },
  delete: function(path) {
    return axios.delete(apiPathUrl + path)
      .then(function (response) {
        return response;
      })
      .catch(response=> {
        return this.handleError(response);
      });
  },
  handleError: function(response){
    return Promise.reject(response);
  },
};
