/* eslint-disable no-prototype-builtins */
const SocietyValidationObject = {
  societyDataMap: {
    name: {
      min: 3, max: 150, regex: /^[a-zA-Z]+$/
    },
    addressLine1: {
      min: 2,
      max: 1024,
      // eslint-disable-next-line no-useless-escape
      regex: /[A-Za-z0-9'\.\-\s\,]/
    },
    addressLine2: {
      // eslint-disable-next-line no-useless-escape
      min: 2, max: 1024, regex: /[A-Za-z0-9'\.\-\s\,]/
    },
    city: {
      min: 3,
      max: 100,
      regex: /^[a-zA-Z]+$/
    },
    state: {
      min: 3,
      max: 100,
      regex: /^[a-zA-Z]+$/
    },
    pincode: {
      min: 6,
      max: 6,
      regex: /^[1-9][0-9]{5}$/
    }
  },
  /**
   * Validates a given input with main society data map object.
   * @param {any} property - property to be verified
   */
  validateProperty: function (property, data) {
    if (!property || !data) return { error: true, message: 'No property or data value provided' };

    if (typeof (data) !== 'string') {
      return {
        error: true,
        message: `Data type of ${property} should be string`
      };
    }

    if (data.length < this.societyDataMap[property].min || data.length > this.societyDataMap[property].max) {
      return {
        error: true,
        message: `${property} should be between ${this.societyDataMap[property].min} and ${this.societyDataMap[property].max} long`
      };
    }

    if (!this.societyDataMap[property].regex.test(data)) {
      return {
        error: true,
        message: `Invalid value provided for ${property}`
      };
    }

    return { error: false };
  },
  /**
   * Validation payload over the property array provided
   * @param {Object} payload - payload to be verified
   * @param {Array} properties - properties inside payload to be verified
   */
  validatePayload: function (payload = {}, properties = []) {
    if (!payload || !Object.keys(payload)?.length) {
      return {
        error: true,
        message: 'No valid payload provided'
      };
    }

    const props = properties.length ? properties : Object.keys(payload);

    for (const prop of props) {
      if (!Object.prototype.hasOwnProperty(this.societyDataMap, prop)) {
        return {
          error: true,
          message: `Cannot verify property - ${prop}`
        };
      }
    }

    for (const prop of properties) {
      if (!payload[prop]) {
        return {
          error: true,
          message: `The property ${prop} is empty in the payload`
        };
      }
    }

    for (const prop of properties) {
      const result = this.validateProperty(prop, payload[prop]);
      if (result.error) {
        return result;
      }
    }

    return { error: false };
  },
  /**
   * Validates Create Society payload, only to allow to admin
   * when admin ID is provided.
   * @param {Object} payload - society creation payload
   */
  createSociety: function (payload = {}) {
    if (!payload || typeof payload !== 'object' || !Object.keys(payload)?.length) {
      return {
        error: true,
        message: 'No valid payload provided'
      };
    }

    if (!payload.paid) {
      return {
        error: true,
        message: 'Payment is needed in order to proceed further'
      };
    }

    if (!payload.adminId) {
      return {
        error: true,
        message: 'Admin ID is not provided'
      };
    }
  }
};

module.exports = SocietyValidationObject;
