const response = require('./utils/response');
const Validator = require('validatorjs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return response({
      message: `The ${event.httpMethod} method is not supported for this route. Supported methods: POST.`
    }, 405);
  }

  try {
    const request = JSON.parse(event.body);

    const validation = new Validator(request, {
      name: 'required|min:3',
      email: 'required|email|confirmed',
      email_confirmation: 'required'
    });

    if (validation.fails()) {
      return response({
        message: 'The given data was invalid.',
        errors: validation.errors.all()
      }, 400);
    }

    return response({ data: request }, 200);
  } catch (err) {
    return response({ message: 'Something went wrong.' }, 500);
  }
};