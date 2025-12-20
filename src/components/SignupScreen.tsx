// ============================================================================
// サインアップ画面
// ============================================================================

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type User from "../types";
import axios from "axios";

const SignupScreen: React.FC<{ onSwitchToLogin: () => void; onSignupSuccess: () => void }> = ({
  onSwitchToLogin,
  onSignupSuccess
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 8) {
      setError('パスワードは8文字以上である必要があります');
      return;
    }

    setLoading(true);
    const success = await signup(email, password, name);
    setLoading(false);

    if (success) {
      onSignupSuccess();
    } else {
      setError('このメールアドレスは既に使用されています');
    }

  ////

    const stored = localStorage.getItem("mockUsers");
    const users = stored ? JSON.parse(stored) : [];
    console.log(users);
    const signupData: User = {
      id: (users.length+1).toString(),
      email: email,
      name: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: 'よろしくお願いします！',
      role: 'Member',
      joinedDate: new Date().toISOString().split('T')[0],
      location: '未設定',
      skills: [],
      password: password,
    };

    try {
      // モックAPIへのPOST（ここではJSONPlaceholderを例に）
      const response = await axios.post('/api/users', signupData);

      if(response.status === 201){
        const newUser = await response.data;
        // const stored = localStorage.getItem("mockUsers")
        // const users = stored ? JSON.parse(stored) : [];
        // users.push(newUser);
        // localStorage.setItem("mockUsers", JSON.stringify(users));

        console.log('登録成功:', newUser);
        setMessage('登録が完了しました！');
      } else {
        setMessage('登録に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
      setMessage('エラーが発生しました');
    }
  ////

    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 transform transition-all hover:scale-[1.02]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl mb-4 shadow-lg transform -rotate-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              サインアップ
            </h1>
            <p className="text-purple-200">新しいアカウントを作成</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                お名前
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="山田太郎"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                パスワード確認
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 disabled:opacity-50 transform hover:scale-[1.02] shadow-lg"
            >
              {loading ? 'アカウント作成中...' : 'アカウント作成'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-200 text-sm">
              既にアカウントをお持ちの方は{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-purple-300 hover:text-white font-semibold underline transition"
              >
                ログイン
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default SignupScreen;