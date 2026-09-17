/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Toutes les images de l'API Museum sont des miniatures Wikimedia :
    // on laisse Wikimedia les servir/cacher via son propre CDN au lieu de
    // les faire proxyfier par l'optimiseur Next (voir src/lib/wikimedia-loader.js).
    loader: 'custom',
    loaderFile: './src/lib/wikimedia-loader.js',
  },
}

export default nextConfig
