import { Box } from "@mui/material";

const Word = ({ word }) => {
  const formattedDate = new Date(word.save_date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        border: "1px solid lightgrey",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "12px",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 500,
          color: "#333",
          marginBottom: "8px",
        }}
      >
        {word.word_eg}
      </span>
      <span
        style={{
          fontSize: "16px",
          color: "#555",
          marginBottom: "6px",
        }}
      >
        {word.word_kr}
      </span>
      <span
        style={{
          fontSize: "12px",
          color: "#888",
          marginTop: "4px",
        }}
      >
        {formattedDate}
      </span>
    </Box>
  );
};

export default Word;
