// LogoutConfirmationModal.tsx
import React from 'react';
import type { LogoutConfirmationModalProps } from "../types";
/**
 * ログアウト確認モーダルコンポーネント
 * 
 * ユーザーがログアウトボタンをクリックした際に表示される確認ダイアログ。
 * 誤操作を防ぎ、ユーザーに確認を促します。
 * 
 * @example
 * ```tsx
 * const [showModal, setShowModal] = useState(false);
 * 
 * <LogoutConfirmationModal
 *   isOpen={showModal}
 *   onConfirm={() => {
 *     setShowModal(false);
 *     logout();
 *   }}
 *   onCancel={() => setShowModal(false)}
 *   userName="山田太郎"
 * />
 * ```
 */
const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  userName
}) => {
  // モーダルが閉じている場合は何も表示しない
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scaleIn">
        {/* アイコン */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </div>
        </div>

        {/* タイトルとメッセージ */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ログアウトしますか？
          </h2>
          <p className="text-gray-600">
            {userName}さん、本当にログアウトしてもよろしいですか？
          </p>
        </div>

        {/* ボタン */}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition duration-300"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-105"
          >
            ログアウト
          </button>
        </div>
      </div>

      {/* アニメーションスタイル */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LogoutConfirmationModal;