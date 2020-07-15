import React, { Fragment, useState, useRef } from "react";
import ReactTags from "react-tag-autocomplete";
import "./tags.scss";
import { getUsers } from "../../../api/users.requests";
import { useEffect } from "react";

export default function GroupMembersAddContainer() {
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const reactTags = useRef();

  useEffect(() => {
      if(suggestions.length === 0) {
        getUsers().then(response => {
            const userSuggestions = response.data.map(user => {
                return { id: user.id, name: `${user.name} ${user.lastname} (${user.email})` }
            });
            setSuggestions(userSuggestions);
        });
      }
  })

  function handleAddition(tag) {
      const duplicated = tags.findIndex(x => x.id === tag.id) > -1;
      if(duplicated) {
          alert("Este usuario ya está en el grupo");
          return;
      }
      const newTags = [...tags, tag];
      setTags(newTags);
  }

  function handleDelete(tag) {
    tags.splice(tag, 1);
  }

  return (
    <div className="mt-3">
      <h1>Añadir usuarios al grupo</h1>
      <ReactTags
        ref={reactTags}
        tags={tags}
        suggestions={suggestions}
        onDelete={tag => handleDelete(tag)}
        onAddition={tag => handleAddition(tag)}
      />
    </div>
  );
}
