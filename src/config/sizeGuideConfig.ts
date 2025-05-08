// src/config/sizeGuideConfig.ts
export interface SizeGuideConfigItem {
  image: string;
  labels: Record<string, string>;
}

export const sizeGuideConfig: Record<string, SizeGuideConfigItem> = {
  Entire: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  Top: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/cba04f035c2ef680c59aac3c5535fd95.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.암홀',
      D: 'D.총길이',
    },
  },
  Tshirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/25db6b65a4c2eccbe1ea546026389427.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Blouse: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  KnitTop: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/25db6b65a4c2eccbe1ea546026389427.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  ShirtTop: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  MiniSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  MidiSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  LongSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  Pants: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/59c6a4e2fb13d263e2799ab338f8674a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.허벅지둘레',
      D: 'D.밑위길이',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  MiniDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  MidiDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  LongDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  TowDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  JumpSuit: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/5ded97cf03063ebe34316355b36a419c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.총길이',
    },
  },
  Best: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/356a561aa2641c9a99a5fa22196a60fb.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Cardigan: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/88bf095e82d97c3fa1fbc85dea6fb58b.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Jacket: {
    image:
      'https://www.daehyuninside.com/_skin/daehyun_250205/img/etc/OUTER3.jpg',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.암홀',
      F: 'F.총길이',
      G: 'G.밑단둘레',
    },
  },
  Padding: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/88bf095e82d97c3fa1fbc85dea6fb58b.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Coat: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/c514aa235c2c74a8f6c9a4d6ee59e58e.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.암홀',
      F: 'F.총길이',
      G: 'G.밑단둘레',
    },
  },
};
