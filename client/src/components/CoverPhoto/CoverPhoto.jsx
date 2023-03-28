import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/profile/action';
import getCroppedImg from '../UploadProfile/cropImage';
import { BiWorld } from 'react-icons/bi';
import './CoverPhoto.css';

const CoverPhoto = () => {
  const { _id, fs_name, sur_name, cover_photo } = useSelector(
    (state) => state.user
  );
  const name = fs_name + ' ' + sur_name;
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handlePhoto = (e) => {
    const photo = URL.createObjectURL(e.target.files[0]);
    setFile(photo);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);
      setZoom(1);
      setFile(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, file]);

  const photoUpload = async () => {
    showCroppedImage();
    // manage blob file
    const blob = await fetch(file).then((res) => res.blob());
    const photo = new File([blob], `${name}_profile.jpg`, {
      type: 'image/jpeg',
    });

    const data = new FormData();
    data.append('cover_photo', photo);

    dispatch(updateProfile(_id, data));
    setFile(null);
  };

  return (
    <>
      <div className='fb-header-shad'></div>
      <div className='fb-cover-photo'>
        {!file ? (
          <>
            <img
              src={cover_photo ? `/cover_photos/${cover_photo}` : ''}
              alt=''
            />
            <input type='file' id='cover-photo' onChange={handlePhoto} />
            <label htmlFor='cover-photo'>
              <span className='camera-icon'></span> Edit cover photo
            </label>
          </>
        ) : (
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={8 / 3.6}
            cropShape='rect'
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit='horizontal-cover'
          />
        )}
      </div>
      {file && (
        <div className='main-cover'>
          <div className='left-cover'>
            <BiWorld />
            <h4>Your cover photo is public.</h4>
          </div>
          <div className='right-cover'>
            <div className='all-buttons'>
              <button onClick={''}>Cancel</button>
              <button onClick={photoUpload}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverPhoto;
