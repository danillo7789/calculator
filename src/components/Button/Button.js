import './Button.css';

const Button = ({ classname, onClick, value }) => {

    return (
        <>
            <button className={classname} onClick={onClick} >
                {value}
            </button>
        </>
    )
}

export default Button;