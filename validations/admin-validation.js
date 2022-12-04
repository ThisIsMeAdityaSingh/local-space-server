/* eslint-disable valid-typeof */
const AdminValidationsObject = {
  adminDataMap: {
    firstName: {
      type: 'string', min: 3, max: 150, regex: /^[a-zA-Z]+$/, required: true
    },
    lastName: {
      type: 'string', min: 3, max: 150, regex: /^[a-zA-Z]+$/, required: true
    },
    phone: {
      type: 'string',
      min: 10,
      max: 10,
      // eslint-disable-next-line no-useless-escape
      regex: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      required: true
    },
    email: {
      type: 'string',
      min: 8,
      max: 256,
      // eslint-disable-next-line no-useless-escape
      regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: true
    },
    addressLine1: {
      type: 'string',
      min: 2,
      max: 1024,
      // eslint-disable-next-line no-useless-escape
      regex: /[A-Za-z0-9'\.\-\s\,]/,
      required: true
    },
    addressLine2: {
      // eslint-disable-next-line no-useless-escape
      type: 'string', min: 2, max: 1024, regex: /[A-Za-z0-9'\.\-\s\,]/, required: false
    },
    city: {
      type: 'string',
      min: 3,
      max: 100,
      regex: /^[a-zA-Z]+$/,
      required: true
    },
    state: {
      type: 'string',
      min: 3,
      max: 100,
      regex: /^[a-zA-Z]+$/,
      required: true
    },
    pincode: {
      type: 'string',
      min: 6,
      max: 6,
      regex: /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/,
      required: true
    }
  },
  validPasswordDefinition: [
    {
      minLength: 6,
      ErrorMessage: 'Your password must be at least six characters long.'
    },
    {
      maxLength: 50,
      ErrorMessage: 'Your password cannot be longer than 50 characters.'
    },
    {
      regex: /.*\d/,
      ErrorMessage: 'Your password must contain at least one digit.'
    },
    {
      regex: /.*[a-zA-Z]/,
      ErrorMessage: 'Your password must contain at least one letter.'
    },
    {
      regex: /.*[!@#$%^&*() =+_-]/,
      ErrorMessage: 'Your password must contain at least one symbol in this list !@#$%^&*()=+_- or a space.'
    }
  ],
  /**
   * This function validates the password provided by the user,
   * during the sign up process
   * @param {String} password - password entered by users
   * @return {Object} error - Boolean, message - String
   */
  passwordValidation: function (password) {
    if (!password || typeof password !== 'string') {
      return {
        error: true,
        message: 'Password provided in invalid or not a string'
      };
    }

    for (const regexObject of this.validPasswordDefinition) {
      if (!regexObject.regex.test(password)) {
        return {
          error: true,
          message: regexObject.ErrorMessage
        };
      }
    }

    return { error: false, message: '' };
  },
  /**
   * This method validates the request payload, received upon request.
   * @param {Object} payload - request payload
   * @param {Array} dataProperties - properties to be validated. Default provided.
   * @return {Boolean} object with properties error and message
   */
  validatePayload: function (payload, properties = Object.keys(this.adminDataMap)) {
    if (!payload || typeof payload !== 'object' || !Object.keys(payload)?.length) {
      return {
        error: true,
        message: 'No payload provided'
      };
    }

    for (const validationProperty of properties) {
      // check for if the property is present or not, also take into account of required property
      if (!Object.prototype.hasOwnProperty.call(payload, validationProperty)) {
        if (this.adminDataMap[validationProperty].required) {
          return {
            error: true,
            message: `Payload does not have property ${validationProperty}`
          };
        }
      }

      // If the property is present, go check for it's validation.

      if (typeof payload[validationProperty] !== this.adminDataMap[validationProperty].type) {
        return {
          error: true,
          message: `The data type of ${validationProperty} of payload should be a ${this.adminDataMap[validationProperty].type}`
        };
      }

      if (payload[validationProperty].length < this.adminDataMap[validationProperty].min || payload[validationProperty].length > this.adminDataMap[validationProperty].max) {
        return {
          error: true,
          message: `The ${validationProperty} should be between ${this.adminDataMap[validationProperty].min} and ${this.adminDataMap[validationProperty].max} long`
        };
      }

      if (!this.adminDataMap[validationProperty].regex.test(payload[validationProperty])) {
        return {
          error: true,
          message: `Invalid value provided for ${validationProperty}`
        };
      }
    }

    return { error: false, message: '' };
  }
};

module.exports = AdminValidationsObject;
