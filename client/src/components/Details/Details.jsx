import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails } from '../../redux/profile/action';
import ProfileIntroBtn from '../../utility/design/ProfileIntroBtn';
import Modal from '../Modal/Modal';

const Details = () => {
  const dispatch = useDispatch();

  const {
    _id,
    company,
    position,
    college,
    subject,
    school,
    city,
    hometown,
    relationship,
  } = useSelector((state) => state.user);

  const [showDetails, setShowDetails] = useState(false);
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update Details
  const handleDetailsSave = () => {
    dispatch(updateDetails(_id, input));
    setShowDetails(false);
  };

  useEffect(() => {
    setInput({
      company,
      position,
      college,
      subject,
      school,
      city,
      hometown,
      relationship,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDetails]);

  return (
    <>
      {showDetails && (
        <Modal
          title='Edit details'
          close={setShowDetails}
          button='Save'
          next={handleDetailsSave}
        >
          <div className='modal-form'>
            <div className='modal-form-group'>
              <label htmlFor=''>Work</label>
              <input
                type='text'
                name='company'
                placeholder='Company'
                value={input.company}
                onChange={handleInput}
              />
              <input
                type='text'
                name='position'
                placeholder='Position'
                value={input.position}
                onChange={handleInput}
              />
            </div>
            <div className='modal-form-group'>
              <label htmlFor=''>College</label>
              <input
                type='text'
                name='college'
                placeholder='College name'
                value={input.college}
                onChange={handleInput}
              />
              <input
                type='text'
                name='subject'
                placeholder='Subject'
                value={input.subject}
                onChange={handleInput}
              />
            </div>
            <div className='modal-form-group'>
              <label htmlFor=''>High school</label>
              <input
                type='text'
                name='school'
                placeholder='School name'
                value={input.school}
                onChange={handleInput}
              />
            </div>
            <div className='modal-form-group'>
              <label htmlFor=''>Places lived</label>
              <input
                type='text'
                name='city'
                placeholder='Current city'
                value={input.city}
                onChange={handleInput}
              />
              <input
                type='text'
                name='hometown'
                placeholder='Hometown'
                value={input.hometown}
                onChange={handleInput}
              />
            </div>
            <div className='modal-form-group'>
              <label htmlFor='relation'>Relationship</label>
              <select
                name='relationship'
                id='relation'
                value={input.relationship}
                onChange={handleInput}
              >
                <option value='Single'>Single</option>
                <option value='Married'>Married</option>
                <option value='Divorced'>Divorced</option>
                <option value='Widowed'>Widowed</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      <ProfileIntroBtn open={setShowDetails}>Edit details</ProfileIntroBtn>
    </>
  );
};

export default Details;
