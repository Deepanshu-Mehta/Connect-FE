import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  
  return user && (
    <div className="min-h-screen bg-gray-900">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;