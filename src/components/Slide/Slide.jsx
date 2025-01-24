import React, { useContext, useEffect, useState } from 'react';
import { SystemContext } from '../../context/SystemContext';
import Preloader from "../../assets/preloader.gif";

const SlideShow = () => {
  const { getImages, loading, images } = useContext(SystemContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getImages();
  }, []);

  // Atualiza o índice da imagem a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % 4); // Rotaciona entre 0 e 3 (4 imagens)
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(interval); // Limpeza do intervalo quando o componente for desmontado
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <img className="w-[50px]" src={Preloader} alt="Loading..." />
      </div>
    );
  }

  // Array de imagens
  const imageArray = [
    images.imageOne,
    images.imageTwo,
    images.imageThree,
    images.imageFour
  ];

  // Filtra as imagens válidas
  const validImages = imageArray.filter(image => image !== 'vazio');

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden mb-3 rounded-md">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)` // Move a imagem para a esquerda
        }}
      >
        {validImages.map((image, index) => (
          <img key={index} src={image} alt={`slide-${index}`} className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
