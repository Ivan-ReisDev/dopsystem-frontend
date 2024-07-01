import { useEffect, useState } from 'react';

const Cookie = () => {
    const [accepted, setAccepted] = useState(false);
    const acceptCookies = () => {
        // Aqui você pode definir a lógica para aceitar os cookies (por exemplo, configurar um estado no localStorage)
        setAccepted(true);
        localStorage.setItem("cookie", true)
    };
    useEffect(() => {
        const cookiesLocalStorage = JSON.parse(localStorage.getItem("cookie"));
        if (cookiesLocalStorage) {
            setAccepted(cookiesLocalStorage);
        }
    }, []);
if(accepted === false) {
    return (
        <div className="fixed bottom-0 w-full z-[999] bg-gray-900 text-white p-4">
            <div className="max-w-screen-lg mx-auto flex items-center justify-between">
                <p className="text-sm">
                    Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de cookies.
                </p>
                <button
                    className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
                    onClick={acceptCookies}
                >
                    Aceitar
                </button>
            </div>
        </div>
    );
}
}

export default Cookie;
