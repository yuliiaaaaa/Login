import React from 'react';
import { Deal as DealType } from '../types/Deal';
type Props = {
  deal: DealType;
};

export const Deal: React.FC<Props> = ({ deal }) => {
  return (
    <div className="deal" style={{ backgroundImage: `url(${deal.picture})` }}>
      <div className="deal__content">
        <p className="deal__text">{deal.name}</p>
        <div className="deal__description">
          <div className="deal__description-row">
            <p className="deal__text">{deal.summ} Dhs</p>
            <p className="deal__text">Yield {deal.yield} %</p>
            <p className="deal__text">Sold {deal.sold_percentage} %</p>
          </div>

          <div className="deal__description-row">
            <p className="deal__text">Tiket - {deal.price} Dhs</p>
            <p className="deal__text">Days left {deal.days_left}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
