import { createContext, useState } from 'react';
import PropTypes from 'prop-types';



const PRD = 'https://dopsystem-backend.vercel.app/api/';

const RhContext = createContext("");

const RhProvider = ({ children }) => {
    const [messege, setMessege] = useState("")
    const token = localStorage.getItem('@Auth:Token')


    const rhStatus = async (data) => {
        try {
            const res = await fetch(`${PRD}update/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            const DataMSG = await res.json();
    
            if (res.ok) {
                setMessege(DataMSG)
                

            } else {
                setMessege(DataMSG)
            }
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
        }
    };

    

    const deleteRequeriment = async (data) => {
        try {
            const res = await fetch(`${PRD}delete/status`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const DataMSG = await res.json();

            if (res.ok) {
                setMessege(DataMSG);
                window.location.reload(`${data.type}`)

            } else {
                setMessege(DataMSG);
            }
        } catch (error) {
            console.error('Erro ao deletar documento', error);
        }
    };


    return (
        <RhContext.Provider
            value={{
                rhStatus,
                messege,
                setMessege,
                deleteRequeriment
            }}
        >
            {children}
        </RhContext.Provider>
    );
};

// Propriedades esperadas pelo componente DocsProvider
RhProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { RhProvider, RhContext };