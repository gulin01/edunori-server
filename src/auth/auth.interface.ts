// kakao-user.interface.ts
export interface KakaoUser {
  id: number;
  kakao_account?: {
    email?: string;
    name?: string;
    phone_number?: string;
  };
  properties?: {
    nickname?: string;
  };
}
