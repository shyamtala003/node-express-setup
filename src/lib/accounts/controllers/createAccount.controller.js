import SendResponse from '../../../utils/sendResponse.js';
import accountModel from '../accounts.model.js';

export default async function createAccount(req, res) {
  try {
    const { username, email, password, firstName, lastName, avatar } = req.body;

    // Check if the account already exists
    const existingAccount = await accountModel.findByEmail(email);
    if (existingAccount)
      return SendResponse(
        res,
        409,
        false,
        'Account already exists with this email'
      );

    // Create a new account
    const user = await accountModel.create({
      username,
      email,
      password,
      profile: {
        firstName,
        lastName,
        avatar,
      },
    });

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.id;

    return SendResponse(
      res,
      201,
      true,
      'Account created successfully',
      userObject
    );
  } catch (error) {
    return SendResponse(res, 400, false, error.message, error);
  }
}
