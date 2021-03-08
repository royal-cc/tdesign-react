import React, { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { LoadingIcon } from '../icon';
import useConfig from '../_util/useConfig';
import { StyledProps } from '../_type';
import useCommonClassName from '../_util/useCommonClassName';

export type SwitchChangeEventHandler = (value: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

interface SwitchProps extends StyledProps {
  /**
   * 当前开关值
   * @default false
   */
  value?: boolean;
  /**
   * 初始开关值
   * @default false
   */
  defaultValue?: boolean;
  /**
   * 禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 加载中的开关
   * @default false
   */
  loading?: boolean;
  /**
   * 尺寸，大、中（默认）、小，可选值为 large/ default/small
   * @default default
   */
  size?: string;
  /**
   * switch打开时显示的内容
   */
  activeContent?: string | React.ReactNode;
  /**
   * switch关闭时显示的内容
   */
  inactiveContent?: string | React.ReactNode;
  /**
   * 选择变化时触发
   */
  onChange?: SwitchChangeEventHandler;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { className, value, defaultValue, disabled, loading, size, activeContent, inactiveContent, onChange, ...restProps },
    ref,
  ) => {
    const { classPrefix } = useConfig();
    const [innerChecked, setInnerChecked] = useState(defaultValue || value);

    function onInternalClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (disabled) return;

      const isUnderControl = typeof value !== 'undefined';
      !isUnderControl && setInnerChecked(!innerChecked);
      onChange?.(!innerChecked, e);
    }

    useEffect(() => {
      setInnerChecked(value);
    }, [value]);

    const { SIZE, STATUS } = useCommonClassName();
    const switchClassName = classNames(
      `${classPrefix}-switch`,
      className,
      {
        [STATUS.checked]: innerChecked,
        [STATUS.disabled]: disabled,
        [STATUS.loading]: loading,
      },
      SIZE[size],
    );

    return (
      <button
        {...restProps}
        type="button"
        role="switch"
        disabled={disabled || loading}
        className={switchClassName}
        ref={ref}
        onClick={onInternalClick}
      >
        <span className={`${classPrefix}-switch__handle`}>{loading && <LoadingIcon />}</span>
        <div className={`${classPrefix}-switch__content`}>{innerChecked ? activeContent : inactiveContent}</div>
      </button>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;