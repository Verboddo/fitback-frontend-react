import {useHistory} from "react-router-dom";

//Create button component
function Button({ children, buttonType, location, className, disabled}) {

    // Import the useHistory
    const history = useHistory()

    return(
        //Create the button
        <button
            className={className}
            //Create a button type with adjustable value
            type={buttonType}
            //Create the on click with adjustable history location
            onClick={() => history.push(location)}

            disabled={disabled}
        >
            {/*Make adjustable text for button*/}
            {children}
        </button>
    )
}

export default Button