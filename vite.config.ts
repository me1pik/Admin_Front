import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(), // SVG를 React 컴포넌트로 사용 가능하게 함
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  build: {
    outDir: 'dist',
    sourcemap: false, // 프로덕션 빌드 시 소스맵 생성 비활성화

    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // 자산 파일에 해시 추가
        chunkFileNames: 'js/[name]-[hash].js', // 청크 파일에 해시 추가
        entryFileNames: 'js/[name]-[hash].js', // 엔트리 파일에 해시 추가
      },
    },
  },
});
