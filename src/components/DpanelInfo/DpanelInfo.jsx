import { useContext, useEffect, useState } from 'react';
import { SystemContext } from '../../context/SystemContext';
import Preloader from '../Preloader/Preloader';

const DpanelInfo = () => {
  const { getSystemDpanel, infoSystemDpanel, info, loading, updateSystem, messege } = useContext(SystemContext);

  const [nameOrganization, setNameOrganization] = useState("");
  const [name, setName] = useState("")
  const [destaque1, setDestaque1] = useState("");
  const [destaque2, setDestaque2] = useState("");
  const [destaque3, setDestaque3] = useState("");
  const [destaque4, setDestaque4] = useState("");

  useEffect(() => {
    getSystemDpanel();
  }, []);

  useEffect(() => {
    if (infoSystemDpanel.length > 0) {
      setName(infoSystemDpanel[0].name)
      setNameOrganization(infoSystemDpanel[0].nameOrganization)
      setDestaque1(infoSystemDpanel[0].destaques1)
      setDestaque2(infoSystemDpanel[0].destaques2)
      setDestaque3(infoSystemDpanel[0].destaques3)
      setDestaque4(infoSystemDpanel[0].destaques4)
    }
  }, [infoSystemDpanel]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      destaque1, 
      destaque2, 
      destaque3, 
      destaque4
    }
    await updateSystem(data);
    
  }


  if (loading) {
    return <Preloader />;
  }
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Informações do Sistema</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Dados Gerais</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-semibold">Militares na Ativa</h3>
              <p className="text-2xl">{info.users}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-semibold">Militares Registrados</h3>
              <p className="text-2xl">{info.usersTotal}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-semibold">Departamentos Registradas</h3>
              <p className="text-2xl">{info.teams}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-semibold">Total de Documentos</h3>
              <p className="text-2xl">{info.docs}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='w-full'>
          <div className="mb-4">
            <label htmlFor="nameOrganization" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Organização
            </label>
            <input
              type="text"
              id="nameOrganization"
              name="nameOrganization"
              value={nameOrganization}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Sigla
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="emblema" className="block text-sm font-medium text-gray-700 mb-2">
              Emblema
            </label>
            <input
              type="text"
              id="emblema"
              name="emblema"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder='Adicione a url do emblema.'
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="destaques1" className="block text-sm font-medium text-gray-700 mb-2">
              Destaque 1
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
          </div>
          <div className="mb-4">
            <label htmlFor="destaques2" className="block text-sm font-medium text-gray-700 mb-2">
              Destaque 2
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
          </div>
          <div className="mb-4">
            <label htmlFor="destaques3" className="block text-sm font-medium text-gray-700 mb-2">
              Destaque 3
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
          </div>
          <div className="mb-6">
            <label htmlFor="destaques4" className="block text-sm font-medium text-gray-700 mb-2">
              Destaque 4
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
          </div>
          {messege && <p className="mt-4 text-green-500">{messege.msg}</p>}
          {messege && <p className="mt-4 text-red-500">{messege.error}</p>}
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

export default DpanelInfo;
