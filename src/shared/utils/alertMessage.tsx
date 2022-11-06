import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function success(isValid: any) {
  toast.success(isValid, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500,
  });
}

// export function failure(errorMessage) {
//   toast.error(errorMessage, {
//     position: toast.POSITION.TOP_CENTER,
//     autoClose: 500,
//   });
// }