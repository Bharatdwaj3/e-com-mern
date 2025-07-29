import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../components/index";
const Profile = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
  });

  const [isEditing, setIsEditing]=useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    bio: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/test");
    }
    if (user && user.user_metadata) {
      const userData=({
        displayName: user.user_metadata.displayName || user.name || "",
        bio: user.user_metadata.bio || "",
      });
      setProfileData(userData);
      setEditForm(userData);
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  const updateUserMetaData = async (newData) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:4000/user/update-metadata", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.sub,
          user_metadata: newData,
        }),
      });
      if (response.ok) {
        setProfileData(newData);
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error updating profile: ", error);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="relative h-[3000px] w-screen bg-sky-100 mt-[70px]">
          <Header />
          <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-white rounded-2xl p-6 text-center">
              <h2 className="text-xl font-bold">Loading profile...</h2>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleEditToggle=()=>{
    if(isEditing){
      setEditForm(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile=async(e)=>{
    e.preventDefault();
    await updateUserMetaData(editForm);
  }

  const handleInputChange=(field, value)=>{
    setEditForm(prev=>({
      ...prev,
      [field]:value
    }));
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <div className="relative h-[3000px] w-screen bg-sky-100 mt-[70px]">
        <div className="max-w-3xl mx-auto py-10 px-4">
         
          <div className="bg-gradient-to-r from purple-500 via-pink-500 to-yellow-500 rounded-2xl p-6 flex items-center gap-6 mb-6">
            <div className="flex flex-col md:flex-row items gap-6">
              <div className="relative">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-white text-3xl font-bold drop-shadow-lg">
                {profileData.displayName || user?.name || user?.nickname || "User"}
              </h1>
               {profileData.bio && (
                  <span className="bg-white text-lg opacity-90 mb-3 max-w-md">
                      {profileData.bio}
                  </span>
                )}
              <p className="text-white mt-1 opacity-90">{user?.email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {user?.email_verified && (
                  <span className="bg-green-500 text-white font-medium px-3 py-1 rounded-full text-sm">
                    Verified Email
                  </span>
                )}
              </div>
            </div>
          </div>


          <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Profile Information
            </h2>
                <button
                  onClick={handleEditToggle}
                  className={`px-4 py-2 rounded-lg fomnt-semibold transition-colors duration-200 ${
                    isEditing
                      ? 'bg-gray-50 hover:bg-gray-600 text-white'
                      : 'bg-purple-500 gover:bg-purple-600 text-white'
                  }`}
                >
                  {isEditing ? 'Cancel': 'Edit Profile'}
                </button>
                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="sapce-y-6">
                    <div className="grid grid-cols-1 md:cols-2 gap-6">
                      <div>
                        <label className="block text-gray-600 font-semibold mb-2">
                          Display Name
                        </label>
                        <input type="text" 
                          value={editForm.displayName}
                          onChange={(e)=>handleInputChange('displayName',e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="How should we dsiplay we your name?"
                          maxLength="50"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                          {editForm.displayName.length}/50 characters
                        </p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-semibold mb-2">
                          Email Address
                        </label>
                        <input type="email" 
                          value={user?.email || ""}
                          disabled
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Email"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                          Email cannot be changed
                        </p>
                      </div>
                       <div>
                        <label className="block text-gray-600 font-semibold mb-2">
                          Display Name
                        </label>
                        <textarea 
                          value={editForm.bio}
                          onChange={(e)=>handleInputChange('bio',e.target.value)}
                          rows="4"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Tell others about yourself"
                          maxLength="300"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                          {editForm.bio.length}/300 characters
                        </p>
                      </div>
                      <div className="flex gap-3 pt-4">
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold duration-200 flex items-center gap-2"
                          >
                            Save Changes
                          </button>
                          <button
                    type="button"
                    onClick={handleEditToggle}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Cancel
                  </button>
                      </div>
                    </div>
                  </form>
                ):(
                  <div className="space-y-6">
                    <div className="grid grid-col-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-600 font-semibold">Full Name</h3>
                <p className="text-gray-800">
                  {user.nickname || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold">Email Address</h3>
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold">Created At: </h3>
                <p className="text-gray-800 font-mono text-sm">
                  {user.updated_at
                    ? new Date(user.updated_at).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Logout
              </button>
            </div>
                  </div>
                )}
            
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const ProfileCard=({user, profileData})=>(
  <div className="bg-white rounded-2xl p-7 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      Profile Information
    </h2>
    <div className="grid grid-cols-1 md:grid-sols-2 gap-6">
      <InfoField label="Display Name" value={profileData.displayName || user.name}/>
      <InfoField label="Email Address" value={profileData.email}/>
      <InfoField label="Username" value={profileData.nickname}/>
      <InfoField 
        label="Display Name" 
        value={user.updated_at ? new Date(user.updated_at).toLocaleTimeString(): 'Unknown'}
        fullWidth
        />
    </div>
    {profileData.bio && (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-gray-600 font-semibold mb-2">About</h3>
        <p className="text-gray-800 leading-relaxed">{profileData}</p>
      </div>
    )}
  </div>
)

// eslint-disable-next-line no-unused-vars
const EditProfileForm =({profileData, onSave, onCancel})=>{
  const [formData, setFormData]=useState(profileData)
  const handleSubmit=(e)=>{
    e.preventDefault()
    onSave(formData)
  }

  return(
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Display Name</label>
              <input 
                type="text" 
                value={formData.displayName}
                onChange={(e)=>setFormData({...formData, displayName:e.target.value})} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How should we display your name?"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Bio</label>
              <input  
                value={formData.bio}
                onChange={(e)=>setFormData({...formData, bio:e.target.value})} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Tell us about yourself..."
                maxLength="300"
              />
              <p className="text-gray-500 text-sm mt-1">{formData.bio.length}/300 characters</p>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
            
          </div>  
        </form>
      </div>
    </>
  )
}



export default Profile;