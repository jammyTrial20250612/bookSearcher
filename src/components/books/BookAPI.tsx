import React, { useCallback, useEffect, useState } from "react";
import type { Item, ItemObj } from "../../types";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BookAPI = () => {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const { currentUser, handleAddFavorite, openLogoutModal } = useAuth();
  const [favoriteBookTitle, setfavoriteBookTitle] =
    useState<string>("サッカードリブル解剖図鑑");

  const fetchItems = async () => {
    const appId = import.meta.env.VITE_APP_ID;
    const encodedKeyword = encodeURIComponent(keyword);

    const url = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${encodedKeyword}&applicationId=${appId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      localStorage.setItem("rakutenBooks",JSON.stringify(data))
      console.log(url);
      console.log(items);
      setItems(data.Items);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  useEffect(()=>{
    const localData = localStorage.getItem("rakutenBooks")
    if(localData !== null){
    const localJsonData=JSON.parse(localData);
    setItems(localJsonData.Items);
    }
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center transform -rotate-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h1
                className="text-xl font-bold text-gray-900 w-50"
                style={{ fontFamily: '"DM Serif Display", serif' }}
              >
                楽天ブックスAPI検索
              </h1>
            </div>
            <ul className="flex">
              <li>
                <Link
                  to="/loggedIn/menu"
                  className="flex hover:bg-red-400 bg-white px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                  <div className="px-4">menu</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/loggedIn/users"
                  className="flex hover:bg-blue-400 bg-white px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <div className="px-4">users</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/loggedIn/api"
                  className="flex hover:bg-green-400 bg-white px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  <div className="px-4">book search</div>
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-xl">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  {currentUser?.name}
                </span>
              </div>
              <button
                onClick={openLogoutModal}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-md"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 検索バー */}
        <div className="mb-8">
          <div className="relative max-w-xl flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="商品名を入力"
              className="w-full py-4 pl-12 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition"
            />
            <button onClick={fetchItems} className="p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ユーザーカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {items.map((itemObj, index) => { */}
          {items.map((itemObj, index) => (
            <div
              key={index}
              // onClick={() => onSelectUser(user.id)}
              //   onClick={()=>goToUser(index)}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 group h-70"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <a
                href={itemObj.Item.itemUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <UserDetailScreen userId={index} onBack={()=>{}}/> */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={itemObj.Item.mediumImageUrl}
                    alt={itemObj.Item.title}
                    className="w-16 h-16 rounded-2xl border-2 border-purple-200 group-hover:border-purple-400 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                      {itemObj.Item.title}
                    </h3>
                    <p className="text-sm text-purple-600 font-medium">
                      {itemObj.Item.author}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {itemObj.Item.publisherName}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-30">
                  {itemObj.Item.itemCaption}
                </p>
              </a>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  {itemObj.Item.title === favoriteBookTitle ? (
                    <button className="flex" onClick={()=>handleAddFavorite()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                      </svg>
                      <span className="px-1">追加済</span>
                    </button>
                  ) : (
                    <>
                    <button className="flex" onClick={()=>handleAddFavorite()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                      <span className="px-1">お気に入りに追加</span>
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>isbn: {itemObj.Item.isbn}</span>
                  {/* <span>{book.reviewInfo.map((r)=>(<p>{r.review}:{r.userName}さん</p>))}</span> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              該当する書籍が見つかりません
            </p>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
  //   <ul>
  //     {items.map((itemObj, index) => {
  //       const item:ItemObj = itemObj.Item;
  //       {console.log(itemObj)}
  //       return (
  //         <li key={index}>
  //           <a href={item.itemUrl} target="_blank" rel="noopener noreferrer">
  //             <img src={item.mediumImageUrl} alt={item.title} />
  //             <p>{item.title}</p>
  //             <p>{item.itemPrice}円</p>
  //           </a>
  //         </li>
  //       );
  //     })}
  //   </ul>
};

export default BookAPI;
