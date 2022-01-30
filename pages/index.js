import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { createClient } from "@supabase/supabase-js";

import ItemTask from "../src/components/ItemTask";

const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1MjkzMiwiZXhwIjoxOTU5MTI4OTMyfQ.8F99JfGkl3HnKnJuhuGwfXGK4vpytW9He63Ydc2ZlcE";
const SUPABASE_URL = "https://ddzypugbirpuffsjtigg.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Home() {
  const [title, setTitle] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [done, setDone] = React.useState(false);

  const SetData = () => {
    supabaseClient
      .from("Tasks")
      .select("*")
      .then(({ data }) => {
        setTasks(data);
        console.log(data);
      });
  };

  React.useEffect(() => {
    SetData();

    setDone(true);
  }, []);

  function handelNewTask() {
    const task = {
      done: false,
      title: title,
    };

    supabaseClient
      .from("Tasks")
      .insert([task])
      .then(({ data }) => {
        console.log("Nova task: " + data);
      });

    setTasks([...tasks, task]);
    setTitle("");
    SetData();
  }

  return (
    <StyledBody>
      {done ? (
        <>
          <h1>Todo list</h1>

          <div style={{ marginTop: "30px" }}>
            <ul>
              {tasks.map((taskAtual) => {
                return (
                  <ItemTask
                    taskAtual={taskAtual}
                    supabaseClient={supabaseClient}
                    setData={SetData}
                  />
                );
              })}
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "30px",
            }}
          >
            <input
              type="text"
              value={title}
              placeholder="Task todo"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  if (title.length !== 0) {
                    handelNewTask();
                  }
                }
              }}
            />
            <button
              style={{
                width: "70px",
                height: "20px",
              }}
              onClick={() => {
                handelNewTask();
              }}
              disabled={title.length === 0}
            >
              Add task
            </button>
          </div>
        </>
      ) : (
        <ReactLoading />
      )}
    </StyledBody>
  );
}
