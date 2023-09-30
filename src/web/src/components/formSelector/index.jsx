import React, { useState } from "react";
import { ContainerSelector, Selector, TextSelector } from "./styles";
import Container from "../container";

export default function FormSelector({ selectors, maxWidth, gap }) {
  const [actualSelector, setActualSelector] = useState(0);

  return (
    <Container gap={gap} maxWidth={maxWidth}>
      <ContainerSelector>
        {selectors?.map((selector, index) => {
          return (
            <Selector
              key={index}
              onClick={() => setActualSelector(index)}
              selected={actualSelector === index}
            >
              <TextSelector selected={actualSelector === index}>
                {selector.title}
              </TextSelector>
            </Selector>
          );
        })}
      </ContainerSelector>
      {selectors[actualSelector]?.children}
    </Container>
  );
}
