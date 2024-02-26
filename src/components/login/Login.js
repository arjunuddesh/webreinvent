import { useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../form/Input";
import FormExtra from "../form/FormExtra";
import FormAction from "../form/FormAction";
import { login } from "../../api/login";
import * as Token from "../../constants/Token";
import { useNavigate } from "react-router-dom";
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  let navigate = useNavigate();
  const [loginState, setLoginState] = useState(fieldsState);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginState);
    const response = await login(loginState);
    console.log(response);
    if (response.status == 200) {
      const token = response.data.token;
      const encryptedToken = Token.tokenEncryption(token);
      localStorage.setItem("token", encryptedToken);
      navigate("/dashboard");
    }
   else if (response.response.status == 400) {
      setShowMsg(true);
      setMessage(response.response.data.error);
      console.log(response.response.data.error);
    }
  };


  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
      
      {showMsg && (
        <div role="alert">
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{message}</p>
          </div>
        </div>
      )}
    </form>
  );
}
