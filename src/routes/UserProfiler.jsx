import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Preloader from "../components/Preloader/Preloader";
import Profile from "../pages/Profile/Profile";

export const UserProfile = () => {
    const { nickname } = useParams();
    const { searchAllUsers } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const user = await searchAllUsers(nickname); 
          setProfile(user);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      console.log("teste")
      fetchUser();
    }, [nickname]);
  
    if (loading) return <Preloader />;
    if (error) return <div>{error}</div>;
  
    return profile ? <Profile profile={profile} /> : <div>User not found</div>;
  };