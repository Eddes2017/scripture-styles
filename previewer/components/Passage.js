import React, { useState, useEffect } from "react";
import "../../scss/api-bible-content.scss";
import { apikey } from "../config.json";

const Passage = ({
  bibleId = "61fd76eafa1577c2-01",
  passageId,
  footnotes = false
}) => {
  if (!passageId) {
    return null;
  }
  const [data, setData] = useState({});
  const baseUrl = "https://api.scripture.api.bible/v1";
  const endpoint = isIntro(passageId)
    ? `/bibles/${bibleId}/chapters/${passageId}`
    : `/bibles/${bibleId}/passages/${passageId}`;
  const fetchPassage = async () => {
    const result = await fetch(
      `${baseUrl}${endpoint}?include-notes=${footnotes}`,
      {
        method: "GET",
        headers: {
          "api-key": apikey
        }
      }
    ).then(response => response.json());
    setData(result.data);
  };

  useEffect(() => {
    fetchPassage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="api-bible-content"
      dangerouslySetInnerHTML={{ __html: data.content }}
    />
  );
};

const isIntro = passageId => {
  const [, chapter] = passageId.split(".");
  return chapter === "intro";
};

export default Passage;
