import styled from 'styled-components'

export const Text = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  color: #adbac7;
`

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #22272d;
  padding: 16px;

  > div {
    flex: 1;
    max-width: 900px;
    width: 100%;

    > div#ContainerSearch {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > svg {
        height: 32px;
        width: 32px;
        margin-right: 16px;
        color: #cdd9e5;
      }
    }

    > div#nextPage {
      width: 900px;
      height: 100px;
      display: flex;
      justify-content: space-around;
      margin-top: 10px;

      > button {
        width: 25%;
        height: 40%;
        cursor: pointer;
        font-weight: 525;
        border-radius: 8px;

        background-color: #adbac7;

        border: none;
      }
    }
  }

  input {
    height: 36px;
    width: 100%;
    border: 1px solid #373e47;
    border-radius: 4px;
    background: #22272e;
    color: #cdd9e5;
    padding: 4px;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #444c56;

  padding: 16px 0;

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #adbac7;
  }
`
