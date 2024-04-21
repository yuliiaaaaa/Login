import React from 'react';
import { DealsList } from './DealsList';
import { Loader } from './Loader';
import { useAppSelector } from '../Redux/hooks';

export const HomePage = () => {
  const { isloading, hasError } = useAppSelector((state) => state.dealsReducer);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const openDealsSection = document.getElementById('open-deals');
    if (openDealsSection) {
      openDealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage">
      <div className="homepage__main">
        <div className="layer" />
        <div className="homepage__content">
          <p className="homepage__title">The chemical negatively charged</p>
          <p className="homepage__description">
            Numerous calculations predict, and experiments confirm, that the
            force field reflects the beam, while the mass defect is not formed.
            The chemical compound is negatively charged. Twhile the mass defect
            is
          </p>
          <button
            className="homepage__button"
            onClick={(e) => handleButtonClick(e)}
          >
            Get started
          </button>
        </div>
      </div>

      {isloading && <Loader />}
      {hasError && <h1>Something went wrong..</h1>}
      {!isloading && !hasError && (
        <div className="homepage__block">
          <p className="homepage__open-deals-title" id="open-deals">
            Open Deals
          </p>

          <div className="homepage__list">
            <DealsList />
          </div>
        </div>
      )}
    </div>
  );
};
