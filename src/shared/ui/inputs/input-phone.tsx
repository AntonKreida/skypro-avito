/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { FC, useState, FocusEvent } from "react";
import { Controller, Control } from "react-hook-form";
import { PatternFormat } from "react-number-format";


interface IInputPhoneProps {
    control: Control<any>;
    name: "phone";
    placeholder: string;
    disabled: boolean;
}

export const InputPhone: FC<IInputPhoneProps> = ({ 
  control, 
  name,
  placeholder,
  disabled, 
}) => {
  const [onFocus, setOnFocus] = useState(false);

  const handlerFocus = (event: FocusEvent) => {
    event.stopPropagation();
    setOnFocus(false);
  };

  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({
        field: {
          ref, name, onChange, value 
        } 
      }) => (
        <PatternFormat
          allowEmptyFormatting={ onFocus }
          className={ classNames(`
            w-full py-2 bg-none font-roboto text-lg
            placeholder:text-gray-custom placeholder:font-roboto
            placeholder:text-lg focus:outline-none border-b border-gray-custom 
            disabled:text-gray-custom
            `) }
          disabled={ disabled } 
          format="+7 (###)-###-##-##" 
          getInputRef={ ref }
          mask="_"
          name={ name }
          onBlur={ () => setOnFocus(false) }
          onChange={ onChange }
          onFocus={ handlerFocus }
          placeholder={ placeholder }
          value={ value }
        /> 
      ) }
    />
  );
};

