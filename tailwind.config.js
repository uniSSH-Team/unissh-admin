/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },

    daisyui: {
        themes: [{
            'main': {
                "primary": "#111111",
                "secondary": "#070707",
                "accent": "#1f2937",
                "neutral": "#1B1B1B",
                "base-100": "#111111",
                "info": "#1d4ed8",
                "success": "#16a34a",
                "warning": "#ea580c",
                "error": "#B44141"
            },
        }, ],
    },
    plugins: [require("daisyui")],
}