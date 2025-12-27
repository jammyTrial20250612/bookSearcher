import { useState } from "react";
const UserProfileForm: React.FC = () => {
  const [name, setName] = useState(user?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 子からContextを更新
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
      />
      <button type="submit">更新</button>
    </form>
  );
};

export default UserProfileForm;