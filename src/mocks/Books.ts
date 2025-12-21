// ============================================================================
// モックデータ
// ============================================================================
import type { Book } from "../types";

export let initialMockBooks: Book[] = [
  {
    id: 1,
    title: "React/TypeScript読本",
    author: "typescripter",
    content: "React/TypeScript学習者のために、基礎から解説。gitでサンプルコードのダウンロードおよび閲覧可能",
    imageUrl: "images/reactTypescript.jpg",
    reviewInfo: [
      {id: 1,userId:3,userName:"佐藤健",review: "よかった。"},
      {id: 2,userId:5,userName:"渡辺誠",review: "難しい内容だけど、これを参考に頑張れそうだと思いました。"},
      {id: 3,userId:1,userName:"山田太郎",review: "この書籍のおかげでエンジニアになれました。"},]
  }
];
