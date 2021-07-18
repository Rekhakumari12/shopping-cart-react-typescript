import styled from "styled-components";
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width:100%;
  border:1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  /* padding-top:1rem; */
  img{
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    width: 200px;
  }
  div{
    font-family: Arial, Helvetica, sans-serif;
    padding:1rem;
    height: 100%;
  }
  button{
    border-radius: 0 0 20px 20px;
    padding: 6px 108px;
  }
`