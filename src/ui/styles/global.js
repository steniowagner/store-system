import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    box-sizing:border-box;
    padding:0;
    margin:0;
  }

  body > #root > div {
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility !important;
    display: block;
    height: 100vh;
  },
`;
