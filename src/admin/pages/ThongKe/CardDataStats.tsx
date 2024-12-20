import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroken bg-white py-6 px-7.5 drop-shadow-xl flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
        {children}
      </div>
      <div className="mt-4 text-center">
        <h4 className="text-title-md font-bold text-black dark:text-white">
          {total}
        </h4>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};

export default CardDataStats;
