import React from 'react';
import type UserScreen from "../types"

type Props = {
  onNavigate: (currentScreen: UserScreen) => void;
  onLogout: () => void;
};

const Menu: React.FC<Props> = ({ onNavigate, onLogout }) => {
  return (
    <div className="flex flex-col items-center p-10 space-y-10 font-sans">
      {/* おすすめトピック表示欄 */}
      <div className="bg-blue-100 p-8 rounded-xl w-full max-w-2xl text-center shadow-md">
        <h2 className="text-2xl font-semibold mb-2">📚 おすすめトピック</h2>
        <p className="text-gray-700">
          「森の中の知恵」や「静かな時間の過ごし方」など、心に響く本を紹介中！
        </p>
      </div>

      {/* 機能セレクト表示欄 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition"
          onClick={() => onNavigate('bookSearch')}
        >
          🔍 書籍検索
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition"
          onClick={() => onNavigate('bookList')}
        >
          📖 書籍一覧
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition"
          onClick={() => onNavigate('userList')}
        >
          👥 ユーザー一覧
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition"
          onClick={onLogout}
        >
          🚪 ログアウト
        </button>
      </div>
    </div>
  );
};

export default Menu;
