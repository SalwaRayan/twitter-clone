import { createGlobalStyle } from "styled-components"

// bold
import ChirpBoldWebWoff from './chirp-bold-web.woff'
import ChirpBoldWebWoff2 from './chirp-bold-web.woff2'

// regular
import ChirpRegularWebWoff from './chirp-regular-web.woff'
import ChirpRegularWebWoff2 from './chirp-regular-web.woff2'

// heavy
import ChirpHeavyWebWoff from './chirp-heavy-web.woff'
import ChirpHeavyWebWoff2 from './chirp-heavy-web.woff2'

// extended-heavy
import ChirpExtendedHeavyWebWoff from './chirp-extended-heavy-web.woff'
import ChirpExtendedHeavyWebWoff2 from './chirp-extended-heavy-web.woff2'


export default createGlobalStyle`
    @font-face {
        font-family: 'Twitter Bold';
        src: local('Twitter Bold'), local('TwitterBold'),
        url(${ChirpBoldWebWoff2}) format('woff2'),
        url(${ChirpBoldWebWoff}) format('woff');
    }
    
    @font-face {
        font-family: 'Twitter Regular';
        src: local('Twitter Regular'),
        url(${ChirpRegularWebWoff2}) format('woff2'),
        url(${ChirpRegularWebWoff}) format('woff');
    }

    @font-face {
        font-family: 'Twitter Heavy';
        src: local('Twitter Heavy'),
        url(${ChirpHeavyWebWoff2}) format('woff2'),
        url(${ChirpHeavyWebWoff}) format('woff');
    }

    @font-face {
        font-family: 'Twitter Extended Heavy';
        src: local('Twitter Extended Heavy'),
        url(${ChirpExtendedHeavyWebWoff2}) format('woff2'),
        url(${ChirpExtendedHeavyWebWoff}) format('woff');
    }
`
