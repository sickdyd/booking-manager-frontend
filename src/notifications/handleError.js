import { notification } from "antd";
import authenticate from "../classes/Authenticate";

const parseError = response => {
  if (response?.data?.error?.message) {
    return response?.data?.error?.message;
  } else {
    return response?.message;
  }
}

const checkStatus = response => {

  if (response?.status >= 200 && response?.status < 300) {
    return response;
  }

  if (response?.status === 401) {
    authenticate.authenticated = false;
  }

  const errortext = parseError(response);

  notification.warn({
    message: "Error",
    description: errortext,
  });
  
  // const error = new Error(errortext);
  // error.name = response?.status || response;
  // error.response = response;
  // throw error;
};

export default (err) => {
  try {
    checkStatus(err?.response ? err?.response : err)
    return Promise.reject();
  }
  catch(e) {
    console.log(e);
    return Promise.reject();
  };
}