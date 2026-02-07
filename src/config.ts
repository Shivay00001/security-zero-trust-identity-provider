
import { Configuration } from 'oidc-provider';

export const configuration: Configuration = {
    clients: [
        {
            client_id: 'sample_client_id',
            client_secret: 'sample_client_secret',
            grant_types: ['authorization_code'],
            redirect_uris: ['http://localhost:8080/cb'],
            response_types: ['code'],
        },
    ],
    interactions: {
        url(ctx, interaction) {
            return `/interaction/${interaction.uid}`;
        },
    },
    cookies: {
        keys: ['some secret key', 'and also the old rotated key'],
    },
    claims: {
        openid: ['sub'],
        email: ['email', 'email_verified'],
    },
    features: {
        devInteractions: { enabled: false }, // disable dev interactions
        introspection: { enabled: true },
        revocation: { enabled: true },
    },
    jwks: {
        keys: [
            {
                d: 'VEZOsY07JTFzGTqv6cC2YJcbg5pFKgVv2EmJGfcKvwAl_VNDnbwgwWhite553e8iO87ecay7s_j8fO37s' +
                    'HAnj_CsW1Idb8x5i-1q3n',
                dp: 'E1Y-SN4bQqX7kP-bNgZ_gev-duoAr_TPnRkE0d2P4p8',
                dq: 'F90JPxevQYOlAg_V0SQuJGabI_web5s0V2',
                e: 'AQAB',
                kty: 'RSA',
                n: 'ver_5gR_2-r',
                p: '1r',
                q: 'w',
                qi: 'k'
            }
        ]
    }
};
