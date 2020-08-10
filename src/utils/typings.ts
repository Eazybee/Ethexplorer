export type EventLogs = {
  type: string;
  txHash: string;
  block: number;
  fromAddress: string;
  toAddress: string;
  valueOfToken: number;
};

export interface Req<T = any, E = any> {
  data?: T;
  error?: E;
}

export type Request = (method: string, path: string, data?: Record<string, any>) => Promise<Req>;
