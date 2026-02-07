
import express from 'express';
import { Provider } from 'oidc-provider';
import path from 'path';
import { configuration } from './config';
import { zeroTrustMiddleware } from './middleware/zero-trust';

const app = express();
const PORT = process.env.PORT || 3000;
const ISSUER = `http://localhost:${PORT}`;

async function start() {
    const provider = new Provider(ISSUER, configuration);

    // Trust Proxy for correct proto/host behind load balancers/docker
    app.enable('trust proxy');

    // View Engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Custom interaction routes (login, consent)
    app.get('/interaction/:uid', async (req, res, next) => {
        try {
            const details = await provider.interactionDetails(req, res);
            const { uid, prompt, params } = details;

            const client = await provider.Client.find(params.client_id as string);

            if (prompt.name === 'login') {
                return res.render('login', {
                    client,
                    uid,
                    details: prompt.details,
                    params,
                    title: 'Zero Trust Sign-in',
                    flash: undefined,
                });
            }

            return res.render('interaction', {
                client,
                uid,
                details: prompt.details,
                params,
                title: 'Authorize',
            });
        } catch (err) {
            return next(err);
        }
    });

    app.post('/interaction/:uid/login', express.urlencoded({ extended: false }), async (req, res, next) => {
        try {
            const { uid, prompt, params } = await provider.interactionDetails(req, res);
            const client = await provider.Client.find(params.client_id as string);

            // MOCK authentication - in real life check DB
            // Also implementing Zero Trust check here:
            if (req.body.password !== 'password') {
                return res.render('login', {
                    client,
                    uid,
                    details: prompt.details,
                    params,
                    title: 'Zero Trust Sign-in',
                    flash: 'Invalid credentials',
                });
            }

            const result = {
                login: {
                    accountId: req.body.email,
                },
            };

            await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
        } catch (err) {
            next(err);
        }
    });

    // Zero Trust Middleware applied to the provider routes
    app.use('/oidc', zeroTrustMiddleware, provider.callback());

    app.listen(PORT, () => {
        console.log(`Zero Trust IDP listening on port ${PORT}`);
        console.log(`Issuer: ${ISSUER}`);
        console.log(`Discovery: ${ISSUER}/oidc/.well-known/openid-configuration`);
    });
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
