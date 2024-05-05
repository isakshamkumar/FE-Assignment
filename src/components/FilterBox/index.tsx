import { Box, Typography } from "@mui/material";
import theme from "../../Theme";
import React, { useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
interface Props {
  heading: string;
  children: React.ReactNode;
}
const FilterBox: React.FC<Props> = ({ heading, children }): JSX.Element => {
  const [openDrop, setOpenDrop] = useState(false);
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={openDrop ? "column" : "row"}
        padding={"12px"}
        borderRadius={"6px"}
        gap={"4px"}
        minWidth={"250px"}
        height={"fit-content"}
        position={"relative"}
        sx={{
          border: `1px solid ${theme.colorConstants.borderedGray ?? ""}`,
        }}
      >
        <Box
          onClick={() => setOpenDrop(!openDrop)}
          sx={{
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              minWidth: "100px",
              paddingRight: "10px",
              width: "98%",
              borderRight: `1px solid ${
                theme.colorConstants.borderedGray ?? ""
              }`,
              color: theme.colorConstants.mediumGray,
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {heading}
          </Typography>
          <Box
            sx={{
              transform: `${openDrop ? "rotate(90deg)" : "rotate(-90deg)"}`,
            }}
          >
            <ChevronLeft
              sx={{
                color: theme.colorConstants.mediumGray,
              }}
            />
          </Box>
        </Box>
        <Box display={openDrop ? "block" : "none"}>{children}</Box>
      </Box>
    </>
  );
};

export default FilterBox;
