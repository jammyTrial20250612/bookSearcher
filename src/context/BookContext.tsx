// ============================================================================
// book コンテキスト
// ============================================================================
import {
  useState,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import type { BookContextType, Book } from "../types";
import { loadBooks } from "../mocks/storage";

const BookContext = createContext<BookContextType | undefined>(undefined);
export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [apiBooks, setApiBooks] = useState<Book[]>(loadBooks());
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [favoriteBookTitle, setfavoriteBookTitle] =
    useState<string[]>([]);
  const [serverBooks, setServerBooks] = useState<Book[]>([]);
  
  return (
    <BookContext.Provider
      value={{
        apiBooks: apiBooks, localBooks: localBooks, setLocalBooks: setLocalBooks, favoriteBookTitle: favoriteBookTitle, setfavoriteBookTitle: setfavoriteBookTitle
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
