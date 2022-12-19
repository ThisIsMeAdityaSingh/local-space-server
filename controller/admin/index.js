const { supabaseClient } = require('../../config/index');

/**
 * This controllers fires a request to supabase create user endpoint.
 * METHOD - POST
 */
async function adminSignUpController (req, res) {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode
  } = req.body;

  try {
    const { data, error } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      phone,
      email_confirm: true,
      user_metadata: {
        firstName,
        lastName,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          pincode
        }
      }
    });

    if (error) {
      res.status(400);
      res.json(error);
      return;
    }

    if (data) {
      res.status(201);
      res.json(data.user);
      return;
    }
  } catch (error) {
    res.status(500);
    res.json({
      error: true,
      message: 'Error encountered. Please try again'
    });
  }
};

/**
 * This controller handles Admin login.
 * METHOD - POST
 */
async function adminSignInController (req, res) {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      res.status(400);
      res.json(error);
      return;
    }

    if (data) {
      res.status(200);
      res.json(data);
      return;
    }
  } catch (error) {
    res.status(500);
    res.json({
      error: true,
      message: 'Error encountered. Please try again'
    });
  }
};

/**
 * This controller handles Admin details update.
 * METHOD - PUT
 */
async function adminUpdateController (req, res) {
  const { id } = req.body.id;
  const updatePayload = req.body;

  const propertyList = ['email', 'newPassword', 'password', 'phone'];

  const extractedPayload = {};

  propertyList.forEach(property => {
    if (Object.prototype.hasOwnProperty.call(updatePayload, property)) {
      extractedPayload[property] = updatePayload[property];
    }
  });

  try {
    const { data, error } = await supabaseClient.auth.admin.updateUserById(id, extractedPayload);

    if (error) {
      res.status(400);
      res.json(error);
      return;
    }

    if (data) {
      res.status(200);
      res.json(data);
    }
  } catch (error) {
    res.status(500);
    res.json({
      message: 'Server error encountered.'
    });
  }
};

/**
 * This controller handles delete Admin details.
 * METHOD - DELETE
 */
async function adminDeleteController (req, res) {
  if (!req || !req.body) {
    res.status(400);
    res.json({
      error: true,
      message: 'No request body available'
    });
    return;
  }

  const { id } = req.body;

  if (!id) {
    res.status(400);
    res.json({
      error: true,
      message: 'No ID available to delete'
    });
    return;
  };

  const { data, error } = await supabaseClient.auth.admin.deleteUser(id);

  if (error) {
    res.status(404);
    res.json(error);
    return;
  }

  res.status(204);
  res.json(data);
};

module.exports = { adminSignUpController, adminSignInController, adminUpdateController, adminDeleteController };
