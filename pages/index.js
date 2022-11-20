import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    await import("ace-builds/src-noconflict/mode-javascript");
    await import("ace-builds/src-noconflict/mode-html");
    await import("ace-builds/src-noconflict/mode-css");
    await import("ace-builds/src-noconflict/theme-monokai");
    return ace;
  },
  { ssr: false }
);

const createPlayGroundHtml = (html, css, js) =>
  `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>playground</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>`;

export default function Home() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");
  console.log("html", html);
  console.log("css", css);
  console.log("javascript", javascript);
  const playGroundHtml = createPlayGroundHtml(html, css, javascript);
  const annotations = [
    {
      row: 3, // must be 0 based
      column: 4, // must be 0 based
      text: "error.message", // text to show in tooltip
      type: "error",
    },
  ];
  return (
    <Flex>
      <Tabs>
        <TabList>
          <Tab>HTML</Tab>
          <Tab>CSS</Tab>
          <Tab>JavaScript</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AceEditor
              setOptions={{
                useWorker: false,
                enableBasicAutocompletion: true,
              }}
              value={html}
              onChange={(value) => setHtml(value)}
              theme="monokai"
              mode="html"
              height="500px"
              annotations={annotations}
            />
          </TabPanel>
          <TabPanel>
            <AceEditor
              setOptions={{
                useWorker: false,
                enableBasicAutocompletion: true,
              }}
              value={css}
              onChange={(value) => setCss(value)}
              theme="monokai"
              mode="css"
              height="500px"
              annotations={annotations}
            />
          </TabPanel>
          <TabPanel>
            <AceEditor
              setOptions={{
                useWorker: false,
                enableBasicAutocompletion: true,
              }}
              value={javascript}
              onChange={(value) => setJavascript(value)}
              theme="monokai"
              mode="javascript"
              height="500px"
              width="500px"
              annotations={annotations}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box
        height="500px"
        width="700px"
        border="1px solid #000"
        bg="white"
        mt="58px"
      >
        <iframe
          name="result"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          frameBorder="0"
          width="100%"
          height="100%"
          srcDoc={playGroundHtml}
        ></iframe>
      </Box>
    </Flex>
  );
}
