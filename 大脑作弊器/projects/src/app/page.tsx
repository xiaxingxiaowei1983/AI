import { redirect } from 'next/navigation';

export default function Home() {
  // 重定向到静态HTML页面
  redirect('/index.html');
}
