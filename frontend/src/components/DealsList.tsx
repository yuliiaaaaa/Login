import React from 'react';
import { useAppSelector } from '../Redux/hooks';
import { Deal } from './Deal';

export const DealsList = () => {
  const { deals } = useAppSelector((state) => state.dealsReducer);

  return (
    <div className="list">
      {deals.map((deal) => (
        <Deal deal={deal} />
      ))}
    </div>
  );
};
