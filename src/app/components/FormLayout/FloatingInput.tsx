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
          className="text-md peer block w-full appearance-none rounded-lg border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none"
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          {...props}
          className="text-md peer block w-full appearance-none rounded-lg border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none"
          placeholder=" "
        />
      )}
      <label
        htmlFor={id}
        className="text-md absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
