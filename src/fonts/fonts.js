import { createGlobalStyle } from "styled-components"

import ChirpExtendedHeavyWebWoff from './chirp-extended-heavy-web.woff'
import ChirpExtendedHeavyWebWoff2 from './chirp-extended-heavy-web.woff2'
import ChirpRegularWebWoff from './chirp-regular-web.woff'
import ChirpRegularWebWoff2 from './chirp-regular-web.woff2'

export default createGlobalStyle`
    @font-face {
        font-family: 'Twitter bold';
        src: local('Twitter bold'), local('TwitterBold'),
        url(${ChirpExtendedHeavyWebWoff2}) format('woff2'),
        url(${ChirpExtendedHeavyWebWoff}) format('woff');
    }
    
    @font-face {
        font-family: 'Twitter';
        src: local('Twitter'),
        url(${ChirpRegularWebWoff2}) format('woff2'),
        url(${ChirpRegularWebWoff}) format('woff');
    }
    `
