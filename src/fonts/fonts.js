import { createGlobalStyle } from "styled-components"

import ChirpExtendedHeavyWebWoff from './chirp-extended-heavy-web.woff'
import ChirpExtendedHeavyWebWoff2 from './chirp-extended-heavy-web.woff2'

export default createGlobalStyle`
    @font-face {
        font-family: 'Twitter';
        src: local('Twitter'),
        url(${ChirpExtendedHeavyWebWoff2}) format('woff2'),
        url(${ChirpExtendedHeavyWebWoff}) format('woff');
        /* font-weight: 300; */
        font-style: normal;
    }
`
