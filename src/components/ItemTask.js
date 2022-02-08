import React from "react";
import styled from "styled-components";

import deleteImage from "./delete.png";

function ItemTask(props) {
  const [checked, setChecked] = React.useState(props.taskAtual.done);

  return (
    <li key={props.taskAtual.id}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        <input
          type="checkbox"
          style={{ marginRight: "15px" }}
          onChange={async (event) => {
            // event.target.checked
            const { data, error } = await props.supabaseClient
              .from("Tasks")
              .update({ done: event.target.checked })
              .match({ id: props.taskAtual.id });

            props.taskAtual.done = event.target.checked;
            setChecked(!checked);
          }}
          value={checked}
          checked={checked}
        />
        <p>{props.taskAtual.title}</p>
        <img
          src="https://cdn.discordapp.com/attachments/923258207781146684/940610958240399370/delete.png"
          style={{
            width: "20px",
            height: "20px",
            marginLeft: "10px",
          }}
          onClick={async () => {
            const { data, error } = await props.supabaseClient
              .from("Tasks")
              .delete()
              .match({ id: props.taskAtual.id });

            props.setData();
          }}
        />
      </div>
    </li>
  );
}

export default ItemTask;
