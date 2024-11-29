import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18next
    .use(HttpApi)
    .init({
        interpolation: { escapeValue: false },
        lng: "en",
        fallbackLng: "en", 
        backend: {
            loadPath: '/lang/{{lng}}/{{ns}}.json',
        },        
        ns: ['global'],
        defaultNS: 'global',
    });

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <I18nextProvider i18n={i18next} >
                <App {...props} />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
