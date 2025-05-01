import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './', // 상대경로로 설정하여 배포 환경에서 경로 문제 최소화
  plugins: [
    react(),
    svgrPlugin(), // SVG를 React 컴포넌트로 변환
    tsconfigPaths(), // tsconfig.json의 paths를 자동 반영
  ],
  resolve: {
    // tsconfigPaths()가 paths를 처리해 주므로
    // 별도의 alias 설정은 필요 없지만,
    // '@'만 수동으로 유지하고 싶다면 아래처럼 추가 가능합니다.
    alias: {
      // '@': '/src'
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});
