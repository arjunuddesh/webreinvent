import { useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../form/FormAction";
import Input from "../form/Input";
import { register } from "../../api/register";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function SignUp() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const handleChange = (e) => {
    if (e.target.id == "email" || e.target.id == "password") {
      setSignupState({ ...signupState, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(signupState);
    console.log(response);
    if (response.status == 200) {
      setMsgColor("blue");
      setMessage("Registration Successful");
      setShowMsg(true);
    } else if (response.response.status == 400) {
      setShowMsg(true);
      setMessage(response.response.data.error);
      setMsgColor("red");
      console.log(response.response.data.error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
      {showMsg && (
        <div role="alert">
          <div
            // class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
            class={`border border-t-0 border-${msgColor}-400 rounded-b bg-${msgColor}-100 px-4 py-3 text-${msgColor}-700`}
          >
            <p>{message}</p>
          </div>
        </div>
      )}
    </form>
  );
}
