import React, { useState } from 'react';
// @ts-ignore
import useFormBee from 'useformbee';
import Table from '../../ui/Table';
import Form from '../../ui/form';
import './styles.scss';
import request from '../../../utils/request';
import { EventLogs, Req } from '../../../utils/typings';
import ethImg from '../../assests/1200px-Ethereum-icon-purple.svg.png';
import LoadingSpinner from '../../ui/LoadingSpinner';

const logTableTopics = ['Type', 'Tx Hash', 'Block', 'From', 'To', 'Value'];
const rules = {
  contractAddress: 'required|alpha_num|size:42',
  walletAdd: 'required|alpha_num|size:42',
};

const HomePage = () => {
  const [logs, setLogs] = useState<EventLogs[] | undefined>();
  const [loading, setLoading] = useState<boolean | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();

  const submit = async (values: any) => {
    const { contractAddress, walletAdd } = values;

    try {
      setLoading(true);
      setServerError(undefined);

      const res: Req<{ logs: EventLogs[] }, { validationMessage: string }> = await request(
        'get',
        `/logs/contract/${contractAddress}/wallet/${walletAdd}`,
      );

      if (res.data?.logs) {
        setLogs(res.data.logs);
        setLoading(false);
        return;
      }

      setLogs([]);
      setLoading(undefined);
      if (res.error?.validationMessage) {
        setServerError(res.error?.validationMessage?.replace(/Given address/, ''));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error.message.includes('Network Error')) {
        setTimeout(() => {
          submit({ contractAddress, walletAdd });
        }, 5000);
      }
    }
  };

  const {
    values, handleChange, handleSubmit, errors,
  } = useFormBee({
    callback: submit,
    rules,
  });

  return (
    <main>
      <section className="header">
        <h1>EthExplorer</h1>
      </section>
      <section className="intro">
        <div className="search">
          <Form
            error={serverError}
            onSubmit={handleSubmit}
            submitLbl="Search"
            inputs={[
              {
                label: 'Contract Address',
                errMsg: errors.contractAddress,
                value: values.contractAddress,
                onChange: handleChange,
                required: true,
                name: 'contractAddress',
                placeholder: '0x312100debd03e6bca7991c55fad75927........',
              },
              {
                label: 'Wallet Address',
                value: values.walletAdd,
                errMsg: errors.walletAdd,
                onChange: handleChange,
                name: 'walletAdd',
                placeholder: '0x312100debd03e6bca7991c55fad75927........',
              },
            ]}
          />
          <div>
            <img src={ethImg} alt="" />
          </div>
        </div>
        {typeof loading !== 'undefined' && (
          <>
            <hr />
            <div className="logs">
              {!loading && logs ? (
                <Table topics={logTableTopics} data={logs} />
              ) : (
                <LoadingSpinner style={{}} />
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
