//Terminado
import React from 'react'

const Header = (props) => {
  return (
    <header className="header" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header