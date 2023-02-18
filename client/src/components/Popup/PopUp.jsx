import React, { useEffect, useState } from 'react';
import './PopUp.css';
import logo from '../../assets/icons/favicon.ico';
import { RxCross2 } from 'react-icons/rx';
import RightTop from '../RightTop/RightTop';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { features } from './array';
const PopUp = () => {
  const [counter, setCounter] = useState(0);

  //   Every five second the counter will increase by one
  useEffect(() => {
    const controlCounter = setInterval(() => {
      if (counter < features.length - 1) {
        setCounter(counter + 1);
      } else {
        clearInterval(controlCounter);
      }
    }, 5000);

    return () => {
      clearInterval(controlCounter);
    };
  }, [counter]);

  return (
    <div className='Popup-canter'>
      <div className='Popup'>
        <div className='Popup-body'>
          <div className='Popup-header-left'>
            <a href='http'>
              <RxCross2 />
            </a>
            <a href='http'>
              <img src={logo} alt='' />
            </a>
          </div>
          <div className='Popup-header-center'>
            <div className='left-arrow'>
              {counter && (
                <div className='arrow' onClick={() => setCounter(counter - 1)}>
                  <AiOutlineLeft />
                </div>
              )}
            </div>
            
            <div
              className='img-div'
              style={{
                backgroundImage: `url(${features[counter]})`,
              }}
            >
              <div className='img-switch-indicator'>
                {features.map((item, index) => (
                  <div className={`indicator ${index < counter && 'active'}`}>
                    {index === counter && <div className='bar-progress'></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className='right-arrow'>
              {counter < features.length - 1 && (
                <div className='arrow' onClick={() => setCounter(counter + 1)}>
                  <AiOutlineRight />
                </div>
              )}
            </div>
          </div>
          <div className='Popup-header-right'>
            <RightTop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
