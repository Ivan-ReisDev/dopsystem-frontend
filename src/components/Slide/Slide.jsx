import { useState, useEffect, useContext } from "react";
import { SystemContext } from "../../context/SystemContext";
import Preloader from '../../assets/preloader.gif';

function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getImages, loading } = useContext(SystemContext);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        setImages([
          data?.imageOne || 'vazio',
          data?.imageTwo || 'vazio',
          data?.imageThree || 'vazio',
          data?.imageFour || 'vazio',
        ]);
      } catch (error) {
        console.error('Erro ao carregar as imagens:', error);
      }
    };

    fetchImages();
  }, [getImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <img src={Preloader} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden mb-3 rounded-md">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.filter((image) => image !== 'vazio').map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
