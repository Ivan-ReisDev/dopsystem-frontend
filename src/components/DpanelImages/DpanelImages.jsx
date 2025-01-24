import { useContext, useEffect, useState } from 'react';
import { SystemContext } from '../../context/SystemContext';
import Preloader from '../../assets/preloader.gif';

const DpanelIMages = () => {
  const { getImages, loading, message, images, updateSystemImages } = useContext(SystemContext);

  const [destaque1, setDestaque1] = useState('');
  const [destaque2, setDestaque2] = useState('');
  const [destaque3, setDestaque3] = useState('');
  const [destaque4, setDestaque4] = useState('');
  
  // Espera até que as imagens sejam carregadas
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getImages();
      } catch (error) {
        console.error('Erro ao carregar as imagens:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && images) {
      setDestaque1(images.imageOne);
      setDestaque2(images.imageTwo);
      setDestaque3(images.imageThree);
      setDestaque4(images.imageFour);
    }
  }, [loading, images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      data:{
        imageOne: destaque1,
        imageTwo: destaque2,
        imageThree: destaque3,
        imageFour: destaque4,
      }

    };

    await updateSystemImages(data);
  };

  // Quando está carregando, exibe o preloader
  if (loading) {
    return <div className='flex items-center justify-center h-full'> <img src={Preloader} alt="Loading..." /></div>;
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Informações de imagens</h1>
        <form onSubmit={handleSubmit} className='w-full'>

          <div className="mb-4">
            <label htmlFor="destaques1" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem 1
            </label>
            <input
              type="text"
              id="destaques1"
              name="destaques1"
              value={destaque1}
              onChange={(e) => setDestaque1(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {destaque1 && <img src={destaque1} alt="Imagem 1" className="mt-2 max-w-full h-auto" />}
          </div>

          <div className="mb-4">
            <label htmlFor="destaques2" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem 2
            </label>
            <input
              type="text"
              id="destaques2"
              name="destaques2"
              value={destaque2}
              onChange={(e) => setDestaque2(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {destaque2 && <img src={destaque2} alt="Imagem 2" className="mt-2 max-w-full h-auto" />}
          </div>

          <div className="mb-4">
            <label htmlFor="destaques3" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem 3
            </label>
            <input
              type="text"
              id="destaques3"
              name="destaques3"
              value={destaque3}
              onChange={(e) => setDestaque3(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {destaque3 && <img src={destaque3} alt="Imagem 3" className="mt-2 max-w-full h-auto" />}
          </div>

          <div className="mb-6">
            <label htmlFor="destaques4" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem 4
            </label>
            <input
              type="text"
              id="destaques4"
              name="destaques4"
              value={destaque4}
              onChange={(e) => setDestaque4(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {destaque4 && <img src={destaque4} alt="Imagem 4" className="mt-2 max-w-full h-auto" />}
          </div>

          {message && <p className="mt-4 text-green-500">{message.msg}</p>}
          {message && <p className="mt-4 text-red-500">{message.error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DpanelIMages;
