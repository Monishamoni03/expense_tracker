import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function showSuccessMessage(isValid: any) {
  toast.success(isValid, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
  });
}

// export default function showErrorMessage(isValid: any) {
//   toast.error(isValid, {
//     position: toast.POSITION.TOP_CENTER,
//     autoClose: 500,
//   });
// }