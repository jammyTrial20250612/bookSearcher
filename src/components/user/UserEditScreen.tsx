// ============================================================================
// ユーザー詳細画面
// ============================================================================
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type User from "../../types";
import { useUser } from "../../context/UserContext";

const UserEditScreen: React.FC = () => {
  const { currentUser, setCurrentUser, isAuthenticated } = useAuth();
  const { updateUser } = useUser();

  const [bio, setBio] = useState<string>(currentUser?.bio || "");
  const [role, setRole] = useState<string>(currentUser?.role || "");
  const [skills, setSkills] = useState<string>(currentUser?.skills.join(",") || "");
  const [location, setLocation] = useState<string>(currentUser?.location || "");

  const handleUpdate = () =>{
    updateUser(
      currentUser!.id,
      bio,
      role,
      location,
      currentUser!.skills
    );
    setCurrentUser({
      ...currentUser!,
      bio: bio,
      role: role,
      location: location,
      skills: currentUser!.skills
    });
    alert("プロフィールが更新されました！");
  };

//   const [changeUserData, setchangeUserData]=useState<User>({
//     id: currentUser?.id,
//     email: currentUser?.email,
//     name: currentUser?.name,
//     avatar: currentUser?.avatar,
//     bio: currentUser?.bio,
//     role: currentUser?.role,
//     joinedDate: currentUser?.joinedDate,
//     location: currentUser?.id,
//     skills: currentUser?.id,
//     password: currentUser?.id,
//   })

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* プロフィールヘッダー */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="flex justify-end h-32 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
            <button onClick={handleUpdate} className="w-24 h-16 bg-green-400 hover:bg-green-200 px-8 py-4 m-12">更新</button>
            </div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl mb-4 sm:mb-0"
              />
              <div className="sm:ml-6 flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"DM Serif Display", serif' }}>
                  {currentUser?.name}
                </h1>
                <input className="text-xl text-purple-600 font-semibold mb-2" value={role} onChange={(e) => setRole(e.target.value)} />
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{currentUser?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>参加日: {currentUser?.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                    {/* 自己紹介 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                自己紹介
              </h2>
              <input type="text" value={bio} onChange={(e)=>setBio(e.target.value)} className="text-gray-700 leading-relaxed" />
            </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
      `}</style>
    </div>
  );
};

export default UserEditScreen;