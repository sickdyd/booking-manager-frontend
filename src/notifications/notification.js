import { notification } from "antd";

export default (type, message) => {

  notification[type]({
    message: type.toUpperCase(),
    description: message,
  });
  
};