import React from 'react';
import styles from './Checkbox.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

interface Props{
    id:string,
    text:string,
    check:boolean,
    onChange:()=>void
}


export default function Checkbox({ id, text, check, onChange }:Props) {
    return (
        <div className={cx('check', 'item')}>
            <div className={cx('sub-text')}>
                <input
                    type="checkbox"
                    id={id}
                    checked={check}
                    onChange={onChange}
                />
                <label className={styles['label']} htmlFor={id}>
                    <SquareBox on={check} />
                    {text}
                </label>
            </div>
        </div>
    );
}

function SquareBox({ on } :{on:boolean}) {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
      >
        <g  transform="translate(-26 -200)">
          <g
            transform="translate(26 200)"
            fill="#fff"
            stroke="#707070"
            strokeWidth="1"
          >
            <rect width="17" height="17" stroke="none" />
            <rect x="0.5" y="0.5" width="16" height="16" fill="none" />
          </g>
          {on &&
                    <path
                    d="M3590.645,195l3.328,4.692,6.5-9.826"
                    transform="translate(-3561 13.221)"
                    fill="none"
                    stroke="#707070"
                    strokeWidth="1"
                  />
          }

        </g>
      </svg>
    );
}
