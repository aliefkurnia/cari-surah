import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const SurahCard = ({ surah, onClick, expanded }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "2px",
        "&:hover": {
          backgroundColor: "#f0f0f0", // Lighter background color on hover
          boxShadow: "0 8px 16px #f0f0f0", // Darker shadow on hover
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {surah.namaLatin}
          </Typography>
          {expanded && (
            <>
              <Typography variant="body2" color="text.secondary">
                Arti: {surah.arti}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Asma: {surah.nama}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tipe: {surah.tempatTurun}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keterangan:{" "}
                <span dangerouslySetInnerHTML={{ __html: surah.deskripsi }} />
              </Typography>
              <audio controls style={{ width: "100%", marginTop: "10px" }}>
                <source src={surah.audioFull["01"]} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SurahCard;
