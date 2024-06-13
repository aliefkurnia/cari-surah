import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SurahCard = ({ surah }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/surah/${surah.nomor}`);
  };

  return (
    <Card
      sx={{
        maxWidth: "40%",
        margin: "3px",
        height: "65px",
        "&:hover": {
          backgroundColor: "#f0f0f0",
          boxShadow: "0 3px 10px #f0f0f0",
        },
        overflow: "hidden",
        borderRadius: "12px", // Menentukan radius sudut untuk membuat card lebih rounded
      }}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent
          sx={{
            maxWidth: "100%",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {surah.namaLatin}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SurahCard;
