import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import ProfileIntroBtn from '../../utility/design/ProfileIntroBtn';
import Modal from '../Modal/Modal';
import PopUp from '../Popup/PopUp';
import { features } from '../../components/Popup/array';
import { useDispatch } from 'react-redux';
import { addFeatured } from '../../redux/profile/action';

const Featured = () => {
  const dispatch = useDispatch();
  // Add Feature
  const [featureAdd, setFeatureAdd] = useState(false);
  const [featureUpload, setFeatureUpload] = useState(false);
  const [featurePhoto, setFeaturePhoto] = useState([]);
  const [checkedPhoto, setCheckedPhoto] = useState([]);

  const [title, setTitle] = useState('');

  // Show Feature
  const [showFeature, setShowFeature] = useState(false);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setFeaturePhoto((prev) => [...prev, ...files]);
    setCheckedPhoto((prev) => [...prev, ...files]);
  };

  const handleChecked = (e) => {
    const photo = featurePhoto.find((item) => item.name === e.target.value);

    if (checkedPhoto.includes(photo)) {
      setCheckedPhoto(checkedPhoto.filter((item) => item !== photo));
    } else {
      setCheckedPhoto((prev) => [...prev, photo]);
    }
  };

  const handleFeatureTitle = () => {
    setFeatureAdd(false);
    setFeatureUpload(true);
  };

  const handleReUpload = () => {
    setFeatureUpload(false);
    setFeatureAdd(true);
  };

  const handleCloudUpload = () => {
    // init from data object
    const formData = new FormData();
    formData.append('title', title);

    checkedPhoto.forEach((photo) => {
      formData.append('file', photo);
    });
    dispatch(addFeatured(formData));
    setFeatureUpload(false);
  };

  return (
    <>
      <div className='all-feature'>
        <div className='fb-feature'>
          <div className='feature' onClick={() => setShowFeature(true)}>
            <img
              src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
              alt=''
            />
          </div>
          <div className='feature'>
            <img
              src='https://unitedthemes.com/wp-content/uploads/2018/09/team2.jpg'
              alt=''
            />
          </div>
          <div className='feature'>
            <img
              src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
              alt=''
            />
          </div>
        </div>
        {/* Feature Button */}
        <ProfileIntroBtn open={setFeatureAdd}>Edit featured</ProfileIntroBtn>

        {/* View Feature */}
        {showFeature && <PopUp features={features} hide={setShowFeature} />}

        {/* Feature Modal */}
        {featureAdd && (
          <Modal
            title='Add Featured Collection'
            close={setFeatureAdd}
            button='Next'
            next={handleFeatureTitle}
          >
            <div className='featured-main-section'>
              <input
                type='file'
                id='upload-photo'
                onChange={handleUpload}
                multiple
              />
              <label className='upload-button' htmlFor='upload-photo'>
                Uploads Photos
              </label>

              <div className='All-image'>
                {featurePhoto.map((photo, index) => {
                  const item = URL.createObjectURL(photo);
                  return (
                    <div className='upload-img' key={index}>
                      <label
                        className='single-ing'
                        htmlFor={`checkbox-${index}`}
                      >
                        <img src={item} alt='' />
                        <input
                          checked={checkedPhoto.includes(photo)}
                          type='checkbox'
                          className='checkbox-design'
                          id={`checkbox-${index}`}
                          value={photo.name}
                          onChange={handleChecked}
                        />
                        <span className='new-checkbox'></span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal>
        )}

        {featureUpload && (
          <Modal
            title='Add Featured Collection'
            close={setFeatureUpload}
            button='Save'
            next={handleCloudUpload}
          >
            <div className='feature-title'>
              <label htmlFor='title'>Feature Title</label>
              <input
                value={title}
                type='text'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className='All-image'>
              <div className='upload-img' onClick={handleReUpload}>
                <div className='add-more'>
                  <div className='just'>
                    <BiAddToQueue />
                    <h5>Add More</h5>
                  </div>
                </div>
              </div>
              {featurePhoto.map((photo, index) => {
                const item = URL.createObjectURL(photo);
                return (
                  <div className='upload-img' key={index}>
                    <label className='single-ing' htmlFor={`checkbox-${index}`}>
                      <img src={item} alt='' />
                      <input
                        checked={checkedPhoto.includes(photo)}
                        type='checkbox'
                        className='checkbox-design'
                        id={`checkbox-${index}`}
                        value={photo.name}
                        onChange={handleChecked}
                      />
                      <span className='new-checkbox'></span>
                    </label>
                  </div>
                );
              })}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Featured;
