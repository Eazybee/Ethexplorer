import express from 'express';
import logsControllers from '../../controllers/logs';
import logsValidations from '../../middlewares/logs';

const router = express.Router();
const { getContractEventLogOfAddress } = logsControllers;
const { validateLogSearch } = logsValidations;

router.get(
  '/logs/contract/:contractAddress/wallet/:walletAddress',
  validateLogSearch,
  getContractEventLogOfAddress,
);

export default router;
