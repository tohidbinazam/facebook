import React, { useCallback, useState } from 'react';
import Modal from '../Modal/Modal';
import { BsFillCameraFill } from 'react-icons/bs';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import './UploadProfile.css';
import { MdCrop } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/profile/action';
import ShowProfile from '../ShowProfile/ShowProfile';

const UploadProfile = () => {
  const { _id, fs_name, sur_name } = useSelector((state) => state.user);
  const name = fs_name + ' ' + sur_name;
  const dispatch = useDispatch();

  const [showProfileUpload, setShowProfileUpload] = useState(false);
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
    // manage blob file
    const blob = await fetch(file).then((res) => res.blob());
    const profile_photo = new File([blob], `${name}_profile.jpg`, {
      type: 'image/jpeg',
    });

    const data = new FormData();
    data.append('photo', profile_photo);

    dispatch(updateProfile(_id, data));
    setShowProfileUpload(false);
    setFile(null);
  };

  return (
    <div>
      <div className='profile-photo'>
        <ShowProfile />
        <BsFillCameraFill onClick={() => setShowProfileUpload(true)} />
      </div>
      {showProfileUpload && (
        <Modal
          title='Update profile picture'
          close={setShowProfileUpload}
          button='Upload'
          next={photoUpload}
        >
          <input type='file' id='upload-photo' onChange={handlePhoto} />
          <label className='upload-button' htmlFor='upload-photo'>
            Upload Photo
          </label>

          {file && (
            <div>
              <div className='main-cropper'>
                <Cropper
                  image={file}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 4}
                  cropShape='round'
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className='controls'>
                <div className='range-section'>
                  <button> - </button>
                  <input
                    type='range'
                    min='1'
                    max='3'
                    step='0.1'
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                  />
                  <button> + </button>
                </div>
                <div className='crop-ing'>
                  <button onClick={showCroppedImage}>
                    <MdCrop />
                    crop Photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default UploadProfile;
