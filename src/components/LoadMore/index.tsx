import React from "react";
import { useDispatch } from "react-redux";
import { increaseLimit } from "../../store/slice/jobData";
import { Button } from "@mui/material";

const IncreaseLimitButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increaseLimit());
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Increase Limit
    </Button>
  );
};

export default IncreaseLimitButton;
