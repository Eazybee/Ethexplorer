import express, {
  Router, Request, Response, NextFunction,
} from 'express';
import path from 'path';
import { debug } from 'console';
import ApplicationError from '../utils/applicationError';
import version1Routes from './v1';
import UserError from '../utils/userError';


const router: Router = express.Router();

router.use(express.static(path.join(__dirname, '/../../build')));
router.get('/', (req: Request, res: Response) => {
  res.send('HomePage');
});
router.use('/api/v1', version1Routes);
router.all('/api/*', (req: Request, res: Response) => res.status(404).end('404: Not found'));

router.use(
  '/api/*',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ApplicationError | UserError | any, req: Request, res: Response, next: NextFunction) => {
    if (!err.status) debug('Error: ', err.stack);
    let errorResponse = {
      message: err.status ? err.message : 'Internal Error',
      type: err.type,
    };

    if (err.validationError) errorResponse = { ...err.validationError, ...errorResponse };

    res.status(err.status || 500).json(errorResponse);
  },
);

router.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

export default router;
