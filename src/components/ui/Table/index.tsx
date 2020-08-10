import React, { FC } from 'react';
import { EventLogs } from '../../../utils/typings';
import './styles.scss';

const Table: FC<Props> = ({ topics, data }: Props) => (
  <table className="logTable">
    <thead>
      <tr>
        {topics.map((topic) => (
          <th key={topic}>{topic}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map(({
        type, txHash, block, fromAddress, toAddress, valueOfToken,
      }) => (
        <tr key={txHash}>
          <td>
            <span title={type}>{type}</span>
          </td>
          <td>
            <span title={txHash}>{txHash}</span>
          </td>
          <td>
            <span title={`${block}`}>{block}</span>
          </td>
          <td>
            <span title={fromAddress}>{fromAddress}</span>
          </td>
          <td>
            <span title={toAddress}>{toAddress}</span>
          </td>
          <td>
            <span title={`${valueOfToken}`}>{valueOfToken}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

type Props = {
  topics: string[];
  data: EventLogs[];
};

export default Table;
