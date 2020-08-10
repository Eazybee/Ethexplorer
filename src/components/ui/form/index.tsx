import React, { FC } from 'react';
import Input, { InputProps } from '../Input';
import './styles.scss';

const Form: FC<Props> = ({
  inputs, submitLbl, onSubmit, error,
}: Props) => (
  <div className="form">
    <p className="error">{error ?? ''}</p>
    <form onSubmit={onSubmit}>
      {inputs.map((inp) => (
        <Input {...inp} key={inp.label} />
      ))}
      <button type="submit">{submitLbl}</button>
    </form>
  </div>
);

type Props = {
  error?: string;
  inputs: InputProps[];
  submitLbl: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default Form;
