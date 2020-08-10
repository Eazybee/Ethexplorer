import { asyncWrapper, validate } from '../utils/helpers';
import web3 from '../utils/web3';
import UserError from '../utils/userError';
import * as types from '../utils/typings';

const validateLogSearch: types.routeCallBack = async (req, res, next) => {
  const rules = {
    contractAddress: 'required|alpha_num|size:42',
    walletAddress: 'required|alpha_num|size:42',
  };

  const validation = validate(req.params, rules);

  if (typeof validation === 'boolean' && validation === true) {
    const { contractAddress, walletAddress } = req.params;

    try {
      web3.utils.isAddress(web3.utils.toChecksumAddress(contractAddress));
      web3.utils.isAddress(web3.utils.toChecksumAddress(walletAddress));
      return next();
    } catch (error) {
      throw new UserError('Invalid Address(es)', 400, undefined, error, {
        validationMessage: error.message.replace(/"/g, ''),
      });
    }
  }

  throw new UserError(
    'Invalid Address(es)',
    400,
    undefined,
    undefined,
    typeof validation !== 'boolean' ? validation.errors.all() : null,
  );
};

export default {
  validateLogSearch: asyncWrapper(validateLogSearch),
};
