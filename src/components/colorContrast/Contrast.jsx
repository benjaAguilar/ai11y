import { useRef, useState } from "react";
import InputHex from "./inputHex/InputHex";
import { openai } from "../Home";
import { z } from "zod";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  Flex,
  Heading,
  IconButton,
  Card,
  Text,
  Button,
  Inset,
  Spinner,
} from "@radix-ui/themes";

import {
  CheckCircledIcon,
  Cross1Icon,
  CrossCircledIcon,
  HeartFilledIcon,
  MagicWandIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";

import { btnSurfaceS } from "../../styleProps";
import { data } from "../../sessionData";
import tinycolor from "tinycolor2";

function Contrast() {
  const [bgValue, setBgValue] = useState("#262626");
  const [fgValue, setFgValue] = useState("#DBFF5E");
  const [btnDisable, setBtnDisable] = useState(false);
  const suggestionsRef = useRef(null);

  const [ratio, setRatio] = useState(
    tinycolor.readability(bgValue, fgValue).toFixed(2)
  );
  const [AA, setAA] = useState(
    tinycolor.isReadable(bgValue, fgValue, { level: "AA", size: "small" })
  );
  const [AAA, setAAA] = useState(
    tinycolor.isReadable(bgValue, fgValue, { level: "AAA", size: "small" })
  );

  const [aiSuggestions, setAiSuggestions] = useState({
    suggestion: "",
    colorIdeas: [],
  });
  const { gen } = useOutletContext();

  const prompt = `
  Hazme una sugerencia de no mas de 50 palabras en idioma ingles de como mejorar el contraste 
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
    //if the colors didnt change dont make the api call
    if (data.colors.bg === bgValue && data.colors.fg === fgValue) {
      console.log("same colors");
      return (suggestionsRef.current.style.transform = "scale(1)");
    }

    setBtnDisable(true);

    const res = await gen(aiObject);

    if (suggestionsRef.current) {
      suggestionsRef.current.style.transform = "scale(1)";
    }
    setBtnDisable(false);

    const arr = [];
    res.colorIdeas.forEach((idea) => arr.push({ ...idea, id: uuidv4() }));

    data.colors.bg = bgValue;
    data.colors.fg = fgValue;

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

  function handleInputSet() {
    const ratio = tinycolor.readability(bgValue, fgValue).toFixed(2);
    setAA(
      tinycolor.isReadable(bgValue, fgValue, { level: "AA", size: "small" })
    );
    setAAA(
      tinycolor.isReadable(bgValue, fgValue, { level: "AAA", size: "small" })
    );
    setRatio(ratio);
  }

  function closeSuggestions() {
    if (suggestionsRef.current) {
      suggestionsRef.current.style.transform = "scale(0)";
    }
  }

  return (
    <>
      <Flex direction="column" gap="2rem">
        <Card className="colorCard">
          <Flex direction="column" gap="2rem">
            <Heading as="h1" size="7">
              Color contrast
            </Heading>
            <Flex gap="3rem" align="center">
              <Flex direction="column">
                <Heading as="h3" size="3">
                  Ratio Contrast
                </Heading>
                <Text className="txt">
                  {ratio}{" "}
                  {ratio <= 4.5 ? "poor" : ratio >= 7 ? "very good" : "good"}
                </Text>
              </Flex>
              <Flex direction="column">
                <Heading as="h3" size="3">
                  AA
                </Heading>
                {AA ? (
                  <Flex align="center" gap="0.2rem">
                    <CheckCircledIcon /> <Text className="txt">Pass</Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap="0.2rem">
                    <CrossCircledIcon /> <Text className="txt">Fail</Text>
                  </Flex>
                )}
              </Flex>
              <Flex direction="column">
                <Heading as="h3" size="3">
                  AAA
                </Heading>
                {AAA ? (
                  <Flex align="center" gap="0.2rem">
                    <CheckCircledIcon /> <Text className="txt">Pass</Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap="0.2rem">
                    <CrossCircledIcon /> <Text className="txt">Fail</Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Flex gap="1rem" align="center" wrap="wrap">
          <InputHex
            setColor={setBgValue}
            color={bgValue}
            handleInputSet={handleInputSet}
          />
          <IconButton variant="ghost" onClick={switchValues}>
            <SymbolIcon width="18" height="18" />
          </IconButton>
          <InputHex
            setColor={setFgValue}
            color={fgValue}
            handleInputSet={handleInputSet}
          />
          <Button
            {...btnSurfaceS}
            size="3"
            className="pushRight"
            onClick={handleAiSuggestions}
            disabled={btnDisable}
          >
            AI suggestions
            <Spinner loading={btnDisable}>
              <MagicWandIcon />
            </Spinner>
          </Button>
        </Flex>
        <Card>
          <Card>
            <Inset>
              <Flex
                direction="column"
                gap="1rem"
                style={{ backgroundColor: bgValue, padding: "1rem" }}
              >
                <Heading as="h5" size="8" style={{ color: fgValue }}>
                  Lorem Ipsum
                </Heading>
                <Heading as="h5" size="7" style={{ color: fgValue }}>
                  Lorem Ipsum
                </Heading>
                <Heading as="h5" size="6" style={{ color: fgValue }}>
                  Lorem Ipsum
                </Heading>
                <Heading as="h5" size="5" style={{ color: fgValue }}>
                  Lorem Ipsum
                </Heading>
                <Text style={{ color: fgValue }} className="txtTest">
                  <strong>Welcome midudev!</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. In pellentesque sagittis nulla
                  eget congue. Morbi vitae velit sollicitudin, lobortis odio
                  vitae, iaculis sapien. In tincidunt mattis quam, eget mollis
                  leo volutpat non. Duis ornare, felis quis pretium ultricies,
                  elit lorem pellentesque nunc, sed elementum sapien risus.
                </Text>
                <Flex gap="1rem" align="center">
                  <Button style={{ backgroundColor: fgValue, color: bgValue }}>
                    Button
                  </Button>
                  <Text className="pushRight" style={{ color: fgValue }}>
                    <strong>Made with love</strong>
                  </Text>
                  <HeartFilledIcon width="20px" height="20px" color={fgValue} />
                </Flex>
              </Flex>
            </Inset>
          </Card>
        </Card>
      </Flex>

      <Card className="suggestionsCard" ref={suggestionsRef}>
        <Flex direction="column" gap="1rem">
          <IconButton
            variant="ghost"
            className="close"
            onClick={closeSuggestions}
          >
            <Cross1Icon />
          </IconButton>
          <Heading as="h2">Suggestions</Heading>
          <Text className="txt">{aiSuggestions.suggestion}</Text>
          <div className="over">
            <Flex direction="column" gap="1rem">
              {aiSuggestions.colorIdeas.map((colors) => {
                return (
                  <Card variant="classic" className="sCard" key={colors.id}>
                    <Flex
                      gap="1rem"
                      align="center"
                      justify="center"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      onClick={() => useColorIdea(colors.id)}
                    >
                      <Card>
                        <Flex
                          direction="column"
                          gap="0.2rem"
                          justify="center"
                          align="center"
                        >
                          <Inset side="top">
                            <div
                              className="sColor"
                              style={{ backgroundColor: colors.backGround }}
                            ></div>
                          </Inset>
                          <Text className="txt">{colors.backGround}</Text>
                        </Flex>
                      </Card>
                      <Card>
                        <Flex
                          direction="column"
                          gap="0.2rem"
                          justify="center"
                          align="center"
                        >
                          <Inset side="top">
                            <div
                              className="sColor"
                              style={{ backgroundColor: colors.foreGround }}
                            ></div>
                          </Inset>
                          <Text className="txt">{colors.foreGround}</Text>
                        </Flex>
                      </Card>
                    </Flex>
                  </Card>
                );
              })}
            </Flex>
          </div>
        </Flex>
      </Card>
    </>
  );
}

export default Contrast;
