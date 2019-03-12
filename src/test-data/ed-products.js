export default {
  get: function(config) {
    let result = {};
    result.data = [{
      'id': 2001,
      'name': 'Cialis',
      'generic': false,
      'generic-name': 'TADALAFIL (TAH DAL A FIL)',
      'strengths':
        [
          {
            'strength': 20,
            'strength-unit': 'mg',
          },
        ],
      'quantities':
        [
          {
            'quantity': 4,
            'quantity-unit': 'tab',
          },
        ],
      'short-info': 'Cialis (Tadalafil) is a drug used to treat male erectile dysfunction (impotence). Cialis drug was developed by the biotechnology firm ICOS and marketed worldwide by Eli Lilly and Company under the brand name Cialis. The most common side effects when undergoing Cialis medication are headache, indigestion, back pain, muscle aches, flushing, and stuffy or runny nose. These possible side effects usually go away after a few hours. Cialis drug helps in relaxing muscles within the penis. This allows increased blood flow into the penis, necessary to achieve and maintain an erection.',
      'long-info': 'jdhsfjsafh',
    }];
    return result;
  },
  put: function(data, config) {
    let result = {};
    result.statusCode = 200;
    result.body = {success: true};
    result.headers = {'content-type': 'application/json'};
    return result;
  },
};
