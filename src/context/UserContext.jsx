import { createContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../provider/axiosInstance';

const UserContext = createContext('');
const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usersArray] = useState('');
  const [messege, setMessege] = useState('');
  const [setMessage] = useState('');
  const [user, setUser] = useState([]);
  const [loggers, setLoggers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [usersPermissions, setUsersPermissions] = useState([]);

  const tokenUser = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));
  const abortControllerRef = useRef(null);

  const searchAllUsers = async (nickname, typeRequeriment) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const response = await axiosInstance.get(
        `search?nickname=${nickname}&typeRequeriment=${typeRequeriment}`,
        { signal }
      );

      setUser(response.data);
      return response.data;
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log('Request was aborted');
      } else {
        console.error(error.message || 'Error fetching user');
      }
    }
  };

  const getAll = async (page, pageSize, nickname = '') => {
    try {
      const response = await axiosInstance.get(
        `all/users?page=${page}&pageSize=${pageSize}&nickname=${nickname}`
      );

      return response.data;
    } catch (error) {
      console.error(error.message || 'Error fetching users');
    }
  };

  const updateUserAdmin = async (data) => {
    try {
      const response = await axiosInstance.put('admin/update', data);

      setMessege(response.data);
    } catch (error) {
      console.error(error.message || 'Error updating user');
    }
  };

  const createTag = async (data) => {
    try {
      const response = await axiosInstance.put('update/tag', data);

      setMessege(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error.message || 'Error creating tag');
    }
  };

  const getLogs = async (page = 1, limit = 12, search = '') => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `loggers?nickname=${tokenUser.nickname}&page=${page}&limit=${limit}&search=${search}`,
        { signal }
      );

      setLoggers(response.data.logs);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (error) {
      if (!axiosInstance.isCancel(error)) {
        setMessage(error.message || 'Unknown error');
        setLoading(false);
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axiosInstance.delete(`user/delete/${id}`);

      setMessage(response.data);
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const listPermissions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('permissions');

      setUsersPermissions(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message || 'Unknown error');
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    getLogs(page, itemsPerPage);
  };

  useEffect(() => {
    getLogs(currentPage, itemsPerPage);
  }, []);

  return (
    <UserContext.Provider
      value={{
        usersArray,
        searchAllUsers,
        setMessege,
        getLogs,
        listPermissions,
        loggers,
        user,
        messege,
        updateUserAdmin,
        createTag,
        getAll,
        currentPage,
        setCurrentPage,
        goToPage,
        loading,
        deleteUser,
        setLoading,
        usersPermissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
