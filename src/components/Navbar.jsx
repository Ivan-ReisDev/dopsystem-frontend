import { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const infoProfileUser = JSON.parse(localStorage.getItem("@Auth:Profile"));
  const [showSidebar, setShowSidebar] = useState(false);
  const activeSidebar = () => setShowSidebar(!showSidebar);
  const location = useLocation();

  const { searchAllUsers, user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  if (location.pathname === "/dpanel") {
    return null; // Não renderiza o Header
  }

  return (
    <div className="h-[61px] w-[100vw] bg-[#f0f0f0] fixed top-0 left-0 z-10 flex items-center">
      <header className="w-full h-full flex flex-row items-center justify-between px-4">
        {/* Botão de menu flutuante no canto superior esquerdo */}
        <button
          className="absolute top-2 left-4 z-20 p-2 bg-black text-white rounded-md shadow-md focus:outline-none hover:bg-gray-400 transition"
          onClick={activeSidebar}
        >
          {showSidebar ? <IoMdClose size={24} /> : <RxHamburgerMenu size={24} />}
        </button>

        {/* Conteúdo central da navbar */}
        <div className="w-[60%] flex items-center justify-center ">
            {/* <div className="border-[1px] flex items-center justify-center  h-8 p-2 rounded-3xl border-[#838383] ml-10">

          <h2 className="font-bold mx-10">
            Bem-vindo(a), {infoProfileUser?.nickname}
          </h2>
            </div> */}
        </div>

        {/* Input de pesquisa e perfil do usuário */}
        <div className="flex items-center">
        <div className="bg-[#e2e2e2de] h-8 p-2 rounded-3xl w-[350px] flex items-center mr-4 relative"> 
  <CiSearch className="text-xl mr-2 text-[#9e9e9e]" />
  <input
    onChange={(e) => {
      setSearch(e.target.value)
      searchAllUsers(e.target.value)}}
    className="w-full h-full bg-transparent outline-none"
    placeholder="Pesquisa rápida de militar"
    type="text"
  />
  {/* Condição para exibir a div de resultados somente se o input não estiver vazio */}
  {search && (
    <div className="w-full p-2 flex flex-col bg-white absolute left-0 top-[100%] z-10 max-h-60 overflow-y-auto rounded-lg shadow-lg">
      {/* Se houver usuários, exibe a lista */}
      {user.users && user.users.length > 0 ? (
        user.users.map((user) => (
          <NavLink to={`/search/${user.nickname}`} key={user._id} className="p-2 hover:bg-gray-200">{user.nickname}</NavLink>
        ))
      ) : (
        // Caso nenhum usuário seja encontrado
        <div className="p-2 text-gray-500">Usuário não encontrado</div>
      )}
    </div>
  )}
</div>

          {infoProfileUser && (
            <div className="flex items-center mr-10">
              <div className="flex flex-col items-center justify-center mr-2">
                <h2 className="m-0 font-bold text-sm leading-[10px]">
                  {infoProfileUser.nickname}
                </h2>
                <span className="text-xs">{infoProfileUser.patent}</span>
              </div>
              <div className="imgSidebar border rounded-full overflow-hidden min-w-14 max-w-6 min-h-14 max-h-10 bg-[url('../')] bg-cover bg-center">
                <img
                  className="m-0 relative bottom-3"
                  src={`https://www.habbo.com.br/habbo-imaging/avatarimage?&user=${infoProfileUser.nickname}&action=std&direction=3&head_direction=3&img_format=png&gesture=sml&headonly=0&size=b`}
                  alt="Avatar"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default Navbar;
