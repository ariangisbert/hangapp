import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Image } from 'react-native';
type RemoteImageProps = {
  ruta?: string;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const ImagenRemotaEvento = ({ ruta, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!ruta) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('imagenes_eventos')
        .download(ruta);

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [ruta]);

  if (!image) {
  }

  

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default ImagenRemotaEvento;