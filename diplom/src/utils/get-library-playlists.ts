import type { IPlaylistResponse } from "@/api/use-load-playlists";

const getPlaylistsWithMainImage = (list: IPlaylistResponse[]) => {
  return list.filter((playlist) => playlist.images?.[0]?.url);
}

export const getLibraryPlaylistsInfo = (list: IPlaylistResponse[]) => {
  const filteredList = getPlaylistsWithMainImage(list);

  return filteredList.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    ownerName: playlist.owner.display_name,
    mainImage: playlist.images?.[0]?.url,
  }));
}


class User { // god object
  constructor(
    public name: string,
    public email: string,
  ) {}
  // 1. Бизнес-логика пользователя
  activate() {
    this.isActive = true;
  }

  updateEmail(email: string) {
    this.email = email;
  }
  // 2. Работа с БД
  saveToDatabase() {
    console.log(`INSERT INTO users VALUES ('${this.email}')`);
  }
  // 3. Отправка email
  sendWelcomeEmail() {
    console.log(`Sending welcome email to ${this.email}`);
  }
  // 4. Форматирование для UI
  toHtml(): string {
    return `<User name="${this.name}" email="${this.email}" />`;
  }
  private isActive = false;
}

const user1 = new User('John Doe', 'john.doe@example.com');

class EmailService {
  welcomeMessage(user: User) {
    this.send(user, 'Welcome to the app');
  }

  send(user: User, message: string) {
    // только отправка писем
  }
}

const emailService = new EmailService();

emailService.welcomeMessage(user1);