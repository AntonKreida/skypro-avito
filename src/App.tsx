import { useForm } from "react-hook-form";

import { Button, Input, InputSearch } from "@shared/";
import "@styles/main.css";


export const App = () => {
  const { control } = useForm();

  return (
    <div>
      <Button 
        sizeButton="smile" 
        text="Hello"
        type="button"
      />
      <Input
        control={ control } 
        name="name"
        placeholder="Enter your name" 
      />
      <InputSearch placeholder="Search" />
    </div>
  );
};
