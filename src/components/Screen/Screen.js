import './Screen.css';
import { Textfit } from 'react-textfit';
// to display output resize on length, i.e longer values should shrink in, npm i react-textfit

const Screen = ({ value }) => {

  // const display = document.querySelectorAll('.screen'); 
  return (
    <Textfit className='screen' mode='single' max={70} >
      {value}
    </Textfit>
  )
}

export default Screen;