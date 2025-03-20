import { CleaveOptions } from "cleave.js/options";
import Cleave from "cleave.js/react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  mask?: CleaveOptions;
}

const FloatingInput = ({ id, label, mask, ...props }: FloatingInputProps) => {
  return (
    <div className="relative">
      {mask ? (
        <Cleave
          options={mask}
          id={id}
          {...props}
          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          {...props}
          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
      )}
      <label
        htmlFor={id}
        className="absolute text-md cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
