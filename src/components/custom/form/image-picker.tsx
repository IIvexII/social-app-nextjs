'use client';

import { useRef } from 'react';
import { useState } from 'react';
import { Input } from '../../ui/input';

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    ref?.current?.click();
  };

  const pickedImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='flex  justify-between cursor-pointer relative'>
      <div className='w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex justify-center items-center cursor-pointer'>
        {pickedImage ? (
          <img
            src={pickedImage}
            alt='Picked'
            className='w-full h-full object-cover'
            onClick={pickImageHandler}
          />
        ) : (
          <p
            className='text-gray-300 text-center p-4 text-sm border-2 border-gray-500 border-dashed w-full h-full flex items-center justify-center'
            onClick={pickImageHandler}
          >
            Pick Image
          </p>
        )}
      </div>
      <Input
        ref={ref}
        type='file'
        accept='image/jpeg, image/jpg, image/png'
        name='image'
        className='absolute bottom-0 left-0 opacity-0'
        onChange={pickedImageHandler}
        required
      />
    </div>
  );
}
