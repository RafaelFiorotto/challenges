import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    margin:0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

body{
    background: #22272D;
}

body, input, button, textarea {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
}

html, body, #root {
    height: 100%;
    width: 100%;
    
    display: flex;
    ::-webkit-scrollbar {
    margin-bottom: 10px;
    width: 14px;
    height: 14px;
    border-radius: 24px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  ::-webkit-scrollbar-corner {
  background: #0c0c0c;
}

  ::-webkit-scrollbar-thumb {
    border-radius: 24px;
    box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.16);
    border: solid 4px transparent;
  }
}`
