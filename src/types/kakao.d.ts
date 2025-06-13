interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Link: {
    sendDefault: (options: any) => void;
  };
}

interface Window {
  Kakao: Kakao;
}
