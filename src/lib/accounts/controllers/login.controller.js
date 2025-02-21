import generateToken from '../../../utils/generateToken.util.js';
import SendResponse from '../../../utils/sendResponse.util.js';
import setCookie from '../../../utils/setCookie.util.js';
import account from '../accounts.model.js';

export default async function login(req, res) {
  try {
    const { email, password } = req.body;
    let user = await account.findByEmail(email).select('+password');

    if (!user) return SendResponse(res, 404, false, 'User not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return SendResponse(res, 400, false, 'Invalid password credentials');

    user = user.toObject();
    delete user.password;

    const refreshToken = generateToken({ id: user._id }, 'refreshToken');
    const accessToken = generateToken({ id: user._id });

    setCookie(res, 'refreshToken', refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 1000
    });
    setCookie(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });

    return SendResponse(res, 200, true, 'Login successful', user);
  } catch (error) {
    return SendResponse(res, 400, false, error.message, error);
  }
}
