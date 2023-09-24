import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BsFileEarmarkWord } from "react-icons/bs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Input,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TopWordCard from "../components/TopWordCard";
import TopCoOccurredCrd from "../components/TopCoOccurredCrd";
import WordCountCard from "../components/WordCountCard";
import axios from "axios";

const defaultTheme = createTheme();

function Homepage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [topCoOccurrences, setTopCoOccurrences] = useState([]);
  const [topWords, setTopWords] = useState([]);
  const [wordCount, setWordCount] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    if (!selectedFile) {
      console.log("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8080/api/upload", formData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setTopCoOccurrences(data.topCoOccurrences);
        setTopWords(data.topWords);
        setWordCount(data.wordCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = async () => {
    try {
      await fetch(
        `http://localhost:8080/api/search/${searchWord}`
      )
      .then((response) => response.json())
      .then(data => console.log(data, "i mam here"))
    } catch (error) {
    //   console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BsFileEarmarkWord sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Text Analyzer
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Text Analyzer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              The Text Analyzer Tool provides top 5 frequently used words,
              co-occurring word pairs, and word frequency analysis for
              comprehensive text insights.
            </Typography>
          </Container>
        </Box>
        <Box>
          <Input
            accept=".txt"
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />
          <Button
            onClick={handleSubmission}
            variant="contained"
            component="span"
          >
            Upload File
          </Button>
        </Box>
        <Box>
          <Input
            id="word-input"
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <Button onClick={handleSearch} variant="contained" component="span">
            Search Word
          </Button>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography>Top 5 mostly occurred words</Typography>

          <TopWordCard topWords={topWords} />
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography>
            Top 5 mostly co-occurred words ( adjacent words in pairs )
          </Typography>
          <TopCoOccurredCrd topCoOccurrences={topCoOccurrences} />
        </Container>
        <Container>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Frequency of each word</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <WordCountCard wordCount={wordCount} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Homepage;
