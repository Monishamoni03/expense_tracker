import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function successMessage(isValid: any) {
  toast.success(isValid, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
  });
}

// export default function failure(errorMessage) {
//   toast.error(errorMessage, {
//     position: toast.POSITION.TOP_CENTER,
//     autoClose: 500,
//   });
// }