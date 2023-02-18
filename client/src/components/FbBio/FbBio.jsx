import React, { useEffect, useState } from 'react';
import { BiWorld } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import ProfileIntroBtn from '../../utility/design/ProfileIntroBtn';
import './FbBio.css';

const FbBio = () => {
  const { bio } = useSelector((state) => state.auth.user);
  const [showInput, setShowInput] = useState(false);
  const [bioData, setBioData] = useState('');
  const [character, setCharacter] = useState(101 - bioData.length);

  const handleInput = (e) => {
    const data = e.target.value;

    if (data.length <= 101) {
      setBioData(data);
      setCharacter(101 - data.length);
    }
  };

  useEffect(() => {
    setBioData(bio ? bio : '');
  }, [bio]);

  return (
    <>
      <div className='fb-intro'>
        <h3>Intro</h3>

        {/* Input Box */}
        {showInput && (
          <>
            <textarea
              className='bio-textarea'
              value={bioData}
              onChange={handleInput}
            ></textarea>
            <div className='bio-buttons'>
              <div className='left-side'>
                <BiWorld />
                <h4>Public</h4>
              </div>
              <div className='right-buttons'>
                <p className='characters-left'>
                  {character} characters remaining
                </p>
                <div>
                  <button
                    className='bio-button'
                    onClick={() => setShowInput(false)}
                  >
                    Cancel
                  </button>
                  <button className='bio-button'>Save</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Output Bio */}
        {!showInput && (
          <>
            <p className='bio'> {bio} </p>
            <ProfileIntroBtn open={setShowInput}>
              {bio ? 'Edit bio' : 'Add bio'}
            </ProfileIntroBtn>
          </>
        )}
      </div>
    </>
  );
};

export default FbBio;
