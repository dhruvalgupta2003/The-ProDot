import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Catalogue Information",
    "Catalogue Options",
    "Catalogue Content",
    "Catalogue Preview",
  ];

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div
          key={index}
          className={`!w-[90%] flex py-5 cursor-pointer`}
          onClick={() => setActive(index)}
        >
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative `}
          >
            <IoMdCheckmark className="text-2xl text-white" />
            {index !== options.length && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-full`}
              />
            )}
          </div>
          <h5
            className={`pl-3 text-[20px] ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
