import { MessengerLayout } from '@/components/messenger-layout';
import { ChatArea } from '@/components/chat-area';
import { Sidebar } from '@/components/sidebar';

export default function Home() {
  return (
    <MessengerLayout>
      <Sidebar />
      <ChatArea />
    </MessengerLayout>
  );
}