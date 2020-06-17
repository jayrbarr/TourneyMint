import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
margin-bottom: 10px;
background-color: darkgreen;
border-radius:28px;
border:1px solid #18ab29;
display:inline-block;
color: white;
padding:3px 8px;
text-decoration:none;
&:hover {
background-color: forestgreen;
}
&:focus {
  outline: 0;
}
`;

const Start = ({ startTourney }) =>  (
  <Button onClick={startTourney} >Start Tournament</Button>
)

export default Start;
