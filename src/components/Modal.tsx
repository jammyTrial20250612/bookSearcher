import UserEditScreen from "./user/UserEditScreen";

type Modalprops = {
    onClose: () => void
}

function Modal({ onClose }: Modalprops) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-screen-full"
        onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じないように
      >
        <h2 className="text-xl font-bold mb-4">モーダルのタイトル</h2>
        <p className="mb-4">
            <UserEditScreen />
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}

export default Modal;
