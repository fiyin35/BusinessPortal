import { AlertType } from "../../../types"
import SuccessIcon from "../../../assets/images/icons/check-circle.png"
import ErrorIcon from "../../../assets/images/icons/x-circle.png"
import "./index.scss"
export const AlertMsg = ({ type, message }: AlertType) => {
    return (
        <div className={`alert-msg ${type}`}>

            {type === "success" &&
                <img className="alert-icon" src={SuccessIcon} alt="" />
            }
            {type === "error" &&
                <img className="alert-icon" src={ErrorIcon} alt="" />
            }

            {type === "error" &&
                <div className="alert-txt">{message || "An Error Occured"} </div>
            }
            {type === "success" &&
                <div className="alert-txt">{message || "Successful"} </div>
            }

        </div>
    )
}