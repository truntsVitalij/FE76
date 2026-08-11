import { useLoadCurrentPlaylist } from "@/api/use-load-current-playlist";
import { type FC } from "react";
import { useParams } from "react-router";
import { AdvWidget } from '@/widgets/adv-widget'

const Playlist: FC = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();


  return (
    <div>
      <HEader />
      <AdvWidget />
      <Chat />
      <GameList currentUser={currentUser}/>
      <Footer />
    </div>
  );
};

export default Playlist;

// SRP Single Responsibility Principle - принцип единственной ответственности 
// (у модуля должна быть только одна причина для изменений)
// антипаттерн - "god" модуль - миллион ответственностей, огромный файл, много зависимостей

// 1. Отрисовка страницы
// 2. вытягивает ID из URL
// 3. Вытягивает плейлисты