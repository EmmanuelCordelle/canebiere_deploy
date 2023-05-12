import { useState } from "react";

const useInput = (props) => {
  const [state, setState] = useState(props);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return {
    state,
    bind: {
      onChange: handleChange,

    }
  };
};

export default useInput;