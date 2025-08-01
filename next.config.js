/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true, // Nécessaire si tu utilises le dossier /app
    },
    output: 'export', // Important pour générer un site statique
};

module.exports = nextConfig;
