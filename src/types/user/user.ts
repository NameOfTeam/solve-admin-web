export interface UserUpdateRequest {
  password?: string;
  introduction?: string;
  role?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  introduction: string;
  role: string;
  streak: number;
  maxStreak: number;
  grass: {
    [key: string]: number;
  };
  solvedToday: boolean;
  solvedCount: number;
  connections: UserConnection[];
  createdAt: string;
  updatedAt: string;
}

export interface UserConnection {
  id: string;
  type: string;
  value: string;
}

export enum UserConnectionType {
  PAYPAL = 'PAYPAL',
  REDDIT = 'REDDIT',
  STEAM = 'STEAM',
  TIKTOK = 'TIKTOK',
  X = 'X',
  EBAY = 'EBAY',
  SPOTIFY = 'SPOTIFY',
  XBOX = 'XBOX',
  BATTLE_NET = 'BATTLE_NET',
  DOMAIN = 'DOMAIN',
  FACEBOOK = 'FACEBOOK',
  LEAGUE_OF_LEGENDS = 'LEAGUE_OF_LEGENDS',
  TWITCH = 'TWITCH',
  YOUTUBE = 'YOUTUBE',
  INSTAGRAM = 'INSTAGRAM',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  TWITTER = 'TWITTER',
  DISCORD = 'DISCORD',
}

export interface UserConnectionAddRequest {
  type: UserConnectionType;
  value: string;
}
