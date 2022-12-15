import './AllButtons.css';
// import Button from '../Button/Button';

const AllButtons = ({ children }) => {

  return (
    <div className='allbuttons'>
       {children}
    </div>
  )

};

export default AllButtons;