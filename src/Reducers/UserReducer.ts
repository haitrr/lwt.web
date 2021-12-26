export interface UserLanguageSetting {
  languageCode: string;
  dictionaryLanguageCode: string;
}

export interface UserState {
  isLoggedIn: boolean;
  languageSettings?: UserLanguageSetting[];
  id?: number;
  userName?: string;
}
