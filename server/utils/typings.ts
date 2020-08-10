import { Request, Response, NextFunction } from 'express';

export type routeCallBack = (req: Request, res: Response, next: NextFunction) => any;

export type validate = (
  data: Record<string, unknown>,
  rules: Validator.Rules,
) => boolean | Validator.Validator<Record<string, unknown>>;

export type asyncWrapper = (
  fn: routeCallBack,
) => (req: Request, res: Response, next: NextFunction) => Promise<any>;

export type removeLeftPadding = (paddedHex: string) => string;
