import React from "react";

// lib
import { Box, Container, Typography } from "@mui/material";

// components
import { ReusableTypography } from "../../Styles/WhatClientSay";
import ClientCard from "./ClientCard/ClientCard";
import Slider from "./Slider/Slider";

// assets
import bgImage from "../../Assets/Images/WhatClientSayAssets/bg-testimonials.jpg";
import iconTitle from "../../Assets/Images/WhatClientSayAssets/icon-title.png";
import profileImg from "../../Assets/Images/WhatClientSayAssets/testimonial-2.png";

function WhatClientSay() {
  return (
    <Container
      component="section"
      maxWidth="xl"
      sx={{
        height: "700px",
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        display: "grid",
        placeItems: "center",
        marginTop: "-100px",
        marginBottom: "-100px",
        position: "relative",
      }}
    >
      <Box sx={{ textDecoration: "none" }}>
        <ReusableTypography
          fontWeight="600"
          smallSizeFontSize="20px"
          mediumSizeFontSize="32px"
          component="h2"
          sx={{
            fontSize: 32,
            textTransform: "uppercase",
            textAlign: "center",
            color: "white",
          }}
        >
          what client say
        </ReusableTypography>

        <Box sx={{ textAlign: "center", mt: 1, mb: 3 }}>
          <img src={iconTitle} alt="icon" />
        </Box>

        <Box>
          <Slider />
        </Box>
      </Box>
    </Container>
  );
}

export default WhatClientSay;