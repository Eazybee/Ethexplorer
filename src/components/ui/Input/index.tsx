import React, { FC } from 'react';
import './styles.scss';


const Input: FC<InputProps> = ({ label, errMsg, ...rest }: InputProps) => (
  <div className="input">
    <label htmlFor={label}>{label}</label>
    <input id={label} type="text" {...rest} />
    {errMsg && <p>{errMsg}</p>}
  </div>
);

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  placeholder: string;
  errMsg?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

export default Input;
