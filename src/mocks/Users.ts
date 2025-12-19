// ============================================================================
// モックデータ
// ============================================================================
import type User from "../types"; 
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: '山田太郎',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yamada',
    bio: 'フルスタック開発者。React と TypeScript が大好きです。',
    role: 'Senior Developer',
    joinedDate: '2023-01-15',
    location: '東京',
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    password: "demo@example.com111",
  },
  {
    id: '2',
    email: 'tanaka@example.com',
    name: '田中花子',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanaka',
    bio: 'UI/UXデザイナー。美しいインターフェースを作ることに情熱を注いでいます。',
    role: 'UX Designer',
    joinedDate: '2023-03-20',
    location: '大阪',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'CSS'],
    password: "tanaka@example.com222",
  },
  {
    id: '3',
    email: 'sato@example.com',
    name: '佐藤健',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato',
    bio: 'バックエンドエンジニア。スケーラブルなシステム設計が得意です。',
    role: 'Backend Engineer',
    joinedDate: '2022-11-10',
    location: '福岡',
    skills: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
    password: "sato@example.com333",
  },
  {
    id: '4',
    email: 'suzuki@example.com',
    name: '鈴木美咲',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suzuki',
    bio: 'プロジェクトマネージャー。チームをまとめることが得意です。',
    role: 'Project Manager',
    joinedDate: '2023-05-01',
    location: '名古屋',
    skills: ['Scrum', 'Agile', 'JIRA', 'Confluence'],
    password: "suzuki@example.com444",
  },
  {
    id: '5',
    email: 'watanabe@example.com',
    name: '渡辺誠',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Watanabe',
    bio: 'データサイエンティスト。機械学習とデータ分析のスペシャリストです。',
    role: 'Data Scientist',
    joinedDate: '2023-02-14',
    location: '横浜',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
    password: "watanabe@exmaple.com555",
  },
  {
    id: '6',
    email: 'kobayashi@example.com',
    name: '小林優子',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kobayashi',
    bio: 'フロントエンドエンジニア。アニメーションとインタラクティブなUIが好きです。',
    role: 'Frontend Engineer',
    joinedDate: '2023-07-22',
    location: '札幌',
    skills: ['Vue.js', 'React', 'Three.js', 'GSAP'],
    password: "kobayashi@example.com666",
  }
];



