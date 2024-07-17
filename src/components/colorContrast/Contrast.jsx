import { useState } from "react";
import Color from "color";
import InputHex from "./inputHex/InputHex";
import { openai } from "../Home";
import { z } from "zod";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Contrast() {
  const [bgValue, setBgValue] = useState("#262626");
  const [fgValue, setFgValue] = useState("#DBFF5E");
  const [ratio, setRatio] = useState(calcRatio(bgValue, fgValue).toFixed(2));
  const [aiSuggestions, setAiSuggestions] = useState({
    suggestion: "",
    colorIdeas: [],
  });
  const { gen } = useOutletContext();

  const prompt = `
  Hazme una sugerencia de no mas de 50 palabras de como mejorar el contraste 
  en los colores ${bgValue} y ${fgValue} para mejorar la accecibilidad web sin 
  incluir los colores en la sugerencia,
  si su contrast ratio ya de por si cumple con estandares AA intenta mejorarlo a AAA o
  si no cumple ningun estandar intenta mejorarlo lo maximo que puedas. Incluye 5 ideas de colores
  dentro de colorIdeas manteniendo la estructura de array de objetos cada idea con su background y foreground utilizando
  colores mas similares posibles a ${bgValue} y ${fgValue} en formato hex tal que mejoren o mantengan un buen nivel de contrast ratio. 
`;

  const aiObject = {
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      suggestion: z.string(),
      colorIdeas: z.array(
        z.object({ backGround: z.string(), foreGround: z.string() })
      ),
    }),
    prompt: prompt,
  };

  async function handleAiSuggestions() {
    const res = await gen(aiObject);

    const arr = [];
    res.colorIdeas.forEach((idea) => arr.push({ ...idea, id: uuidv4() }));

    const obj = { ...res, colorIdeas: arr };
    setAiSuggestions(obj);
  }

  function useColorIdea(id) {
    const colors = aiSuggestions.colorIdeas.filter((color) => color.id === id);
    setBgValue(colors[0].backGround);
    setFgValue(colors[0].foreGround);
    handleInputSet();
  }

  function switchValues() {
    setBgValue(fgValue);
    setFgValue(bgValue);
  }

  function calcColorVals(values) {
    //convert values in a range of 0 and 1
    const linearRgb = values.map((val) => {
      const value = val / 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    //calc the relative luminance R * G * B
    const luminance =
      0.2126 * linearRgb[0] + 0.7152 * linearRgb[1] + 0.0722 * linearRgb[2];

    return luminance;
  }

  function calcRatio(bg, fg) {
    //convert hex to rgb array of vals
    let bgRGB = Color(bg).rgb().array();
    let fgRGB = Color(fg).rgb().array();

    bgRGB = calcColorVals(bgRGB);
    fgRGB = calcColorVals(fgRGB);

    return bgRGB > fgRGB
      ? (bgRGB + 0.05) / (fgRGB + 0.05)
      : (fgRGB + 0.05) / (bgRGB + 0.05);
  }

  function handleInputSet() {
    setRatio(calcRatio(bgValue, fgValue).toFixed(2));
  }

  return (
    <>
      <h1>contrast</h1>
      <p>color contrast</p>
      <div>
        <InputHex
          setColor={setBgValue}
          color={bgValue}
          handleInputSet={handleInputSet}
        />
        <button onClick={switchValues}>switch</button>
        <InputHex
          setColor={setFgValue}
          color={fgValue}
          handleInputSet={handleInputSet}
        />
      </div>
      <div>
        <p style={{ color: bgValue }}>ratio contrast</p>
        <p>
          {ratio} {ratio <= 4.5 ? "poor" : ratio >= 7 ? "very good" : "good"}
        </p>
      </div>
      <div>
        <button onClick={handleAiSuggestions}>AI suggestions</button>
        <div>
          <h3>color contrasts suggestions</h3>
          <p>{aiSuggestions.suggestion}</p>
          <div>
            {aiSuggestions.colorIdeas.map((colors) => {
              return (
                <div key={colors.id} onClick={() => useColorIdea(colors.id)}>
                  <div>
                    <p>{colors.backGround}</p>
                  </div>
                  <div>
                    <p>{colors.foreGround}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: bgValue }}>
        <h2 style={{ color: fgValue }}>Example box</h2>
        <p style={{ color: fgValue }}>here you can visualize the contrast</p>
      </div>
    </>
  );
}

export default Contrast;
