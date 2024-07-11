import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Preloader from "../../assets/preloader.gif"
import { FaCrown } from "react-icons/fa";

const DpanelPermissions = () => {
    const { listPermissions, loading, setLoading, usersPermissions } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        listPermissions();
    }, []);

    {/* Filtra administradores com nickname DOPSystem */ }
    const dopSystemAdmin = usersPermissions.filter(admin => admin.userType === "Admin" && admin.nickname === "DOPSystem");

    {/* Filtra outros administradores */ }
    const otherAdmins = usersPermissions.filter(admin => admin.userType === "Admin" && admin.nickname !== "DOPSystem");

    {/* Combina as duas listas, colocando DOPSystem primeiro */ }
    const combinedAdmins = [...dopSystemAdmin, ...otherAdmins];
    // Renderiza o carregador enquanto espera pela resposta da API
    if (loading) {
        return (
            <div className='flex w-full items-center justify-center h-full'>
                <img src={Preloader} alt="Loading..." />
            </div>
        );
    }



    return (
        <>
            {!loading && (
                <div className="flex flex-col items-center p-4 sm:p-8">
                    <h1 className="text-2xl font-bold mb-4">Controle de Permissões</h1>

                    {/* Admins */}
                    <div className="w-full max-w-lg mb-8">
                        <h2 className="text-xl font-semibold mb-2">Admins</h2>
                        <p className="text-gray-600 text-[13px] mb-2">
                            Administradores têm acesso completo ao sistema e podem realizar todas as operações.
                        </p>
                        <p className='text-gray-600 text-[13px] mb-2'>
                            <span className='font-bold'>Observação:</span> A conta Master não pode ser excluída ou editada por questões de segurança.
                        </p>
                        <ul className="space-y-4">
                            {combinedAdmins.map(admin => (
                                <li key={admin.id} className="p-4 border rounded-lg shadow-md bg-[#fff]">
                                    <h3 className="text-lg font-semibold flex">
                                        {admin.nickname === "DOPSystem" ? (
                                            <>
                                                {admin.nickname} <span className='text-amber-600 relative bottom-[6px] left-[-5px] rotate-[40deg]'><FaCrown /></span>
                                            </>
                                        ) : (
                                            admin.nickname
                                        )}
                                    </h3>
                                    <p className="text-gray-600">{admin.patent}</p>
                                </li>
                            ))}


                        </ul>
                    </div>

                    {/* Diretor */}
                    <div className="w-full max-w-lg mb-8">
                        <h2 className="text-xl font-semibold mb-2">Diretor</h2>
                        <p className="text-gray-600 text-[13px] mb-2">
                            O diretor tem permissões elevadas para gerenciar recursos em todas as equipes criando aulas, documentos e afins, promover para todos os cargos independentemente da regra, excluir requerimentos.
                        </p>
                        <ul className="space-y-4">
                            {usersPermissions.filter(diretor => diretor.userType === "Diretor")
                                .map(diretor => (
                                    <li key={diretor.id} className="p-4 border rounded-lg shadow-md bg-[#fff]">
                                        <h3 className="text-lg font-semibold">{diretor.nickname}</h3>
                                        <p className="text-gray-600">{diretor.patent}</p>
                                    </li>
                                ))}

                        </ul>
                    </div>

                    {/* Recursos Humanos */}
                    <div className="w-full max-w-lg mb-8">
                        <h2 className="text-xl font-semibold mb-2">Recursos Humanos</h2>
                        <p className="text-gray-600 text-[13px] mb-2">
                            O departamento de Recursos Humanos gerencia questões relacionadas aos funcionários e políticas da empresa.
                        </p>
                        <ul className="space-y-4">
                            {usersPermissions.filter(rh => rh.userType === "Recursos Humanos")
                                .map(rh => (
                                    <li key={rh.id} className="p-4 border rounded-lg shadow-md bg-[#fff]">
                                        <h3 className="text-lg font-semibold">{rh.nickname}</h3>
                                        <p className="text-gray-600">{rh.patent}</p>
                                    </li>
                                ))}

                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default DpanelPermissions;
