import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
} from "../../components/Blockly";

import BlocklyJS from "blockly/javascript";
import BlocklyCore from "blockly/core";
import ReactHlsPlayer from 'react-hls-player';

import "../../components/blocks/customblocks";
import "../../components/generator/generator";
import { createTaskComment, deleteTaskComment, editTaskComment, getTaskComments } from "../../api/task.request";
import { getUserDisplayName } from "../../utils/misc";
import { Link } from "react-router-dom";

export default function WorkspaceContainer({ match: { params } }) {
  const { id } = params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [initialXml, setInitialXml] = useState('');
  const taskXmlName = `task-${id}-xml`;

  const simpleWorkspace = useRef();

  function generateXml() {
    var xml = BlocklyCore.Xml.workspaceToDom(
      simpleWorkspace.current.workspace
    );
    const xmlString = new XMLSerializer().serializeToString(xml);
    if (initialXml !== xmlString) {
      setInitialXml(xmlString);
      localStorage.setItem(taskXmlName, xmlString);
    }
  };

  function generateCode() {
    var code = BlocklyJS.workspaceToCode(
      simpleWorkspace.current.workspace
    );
    console.log(code);
  };

  function saveComment() {
    const data = { comment }
    createTaskComment(id, data).then(response => {
      setComment("");
      setComments([...comments, response.data]);
    });
  }

  function onCommentSubmit(e) {
    e.preventDefault();
    if (editingComment) {
      editComment(editingComment.task_id, editingComment.id);
      return;
    }
    saveComment();
  }

  function deleteComment(e, taskId, commentId) {
    e.preventDefault();
    deleteTaskComment(taskId, commentId).then(response => {
      setComments(comments.filter(comment => comment.id !== commentId));
    });
  }

  function editComment(taskId, commentId) {
    const data = { comment };
    editTaskComment(taskId, commentId, data).then(response => {
      setComment("");
      const newComments = comments.map(comment => {
        if (comment.id === commentId) {
          comment.comment = response.data.comment
        }
        return comment;
      });
      setComments(newComments);
      setEditingComment(null);
    });
  }

  useEffect(() => {
    getTaskComments(id).then(response => {
      setComments(response.data);
    });
    const localXml = new Promise((resolve, reject) => {
      const data = localStorage.getItem(taskXmlName);
      data ? resolve(data) : reject();
    })
    localXml.then(data => {
      const xmlElement = BlocklyCore.Xml.textToDom(data);
      BlocklyCore.Xml.clearWorkspaceAndLoadFromXml(
        xmlElement,
        simpleWorkspace.current.workspace
      );
    });
  }, [])

  useLayoutEffect(() => {
    simpleWorkspace.current.workspace.addChangeListener(generateXml);
  }, [])

  return (
    <>
      <BlocklyComponent
        ref={simpleWorkspace}
        readOnly={false}
        trashcan={true}
        media={"/media/"}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
      >
        <Block type="test_move_forward" />
        <Block type="test_move_backwards" />
        <Block type="test_move_left" />
        <Block type="test_move_right" />
        <Block type="test_wait" />
        <Block type="test_react_field" />
        <Block type="test_react_date_field" />
        <Block type="controls_ifelse" />
        <Block type="controls_whileUntil" />
        <Block type="math_arithmetic" />
        <Block type="text_print" />
        <Block type="text" />
        <Block type="math_number" />
        <Block type="logic_compare" />
        <Block type="logic_operation" />
        <Block type="controls_repeat_ext">
          <Value name="TIMES">
            <Shadow type="math_number">
              <Field name="NUM">10</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="logic_operation" />
        <Block type="logic_negate" />
        <Block type="logic_boolean" />
        <Block type="logic_null" disabled="true" />
        <Block type="logic_ternary" />
        <Block type="text_charAt">
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR">text</Field>
            </Block>
          </Value>
        </Block>
      </BlocklyComponent>

      <div className="mt-5 mb-5">
        <button className="btn btn-info" onClick={() => generateXml()}>Generar codigo</button>
      </div>

      <div style={{ background: 'white', borderRadius: '10px' }}>
        <h2 style={{ background: 'rgba(17, 205, 239, 0.08)', padding: '10px', border: '0.5px solid rgba(0, 0, 0, 0.05)', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>Comentarios</h2>
        <div className="comments" style={{ padding: '10px' }}>
          {comments.map(comment => (
            <div key={comment.id} className="comment" style={{ border: '0.5px solid #00000036', padding: '10px' }}>
              <div className="comment-header" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="author-picture"><img alt="Image placeholder" src={`https://ui-avatars.com/api/?background=F89985&color=fff&name=${getUserDisplayName(comment.user)}&size=40`} style={{ borderRadius: '10px' }} /> &nbsp;</div>
                <div className="author-name">{getUserDisplayName(comment.user)}&nbsp;</div>
                <div className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                </div>
                <div className="comment-options">
                  <div className="dropdown">
                    <a
                      className="btn btn-sm btn-icon-only text-light"
                      href="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <Link to={'#'} onClick={() => {
                        setComment(comment.comment);
                        setEditingComment(comment);
                      }
                      } className="dropdown-item">
                        Editar comentario
                      </Link>
                      <Link to={'#'} onClick={(e) => deleteComment(e, comment.task_id, comment.id)} className="dropdown-item">
                        Eliminar comentario
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comment-content">
                <p className="m-0 p-0">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="new-comment" style={{ marginTop: '20px', marginBottom: '100px' }}>
        <form method="get" onSubmit={(e) => onCommentSubmit(e)}>
          <div className="form-group">
            <label className="form-control-label">{editingComment ? 'Editar comentario' : 'Nuevo comentario'}</label>
            <textarea rows={4} onChange={(e) => { setComment(e.target.value) }} placeholder="Escribe tu comentario aqui..." className="form-control" name="description" spellCheck="false" value={comment} required={true} />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">{editingComment ? 'Editar' : 'Insertar'}</button>
          </div>
        </form>
      </div>

      <div className="media-player">
        <ReactHlsPlayer
          src="http://localhost:8085/hls/test.m3u8"
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
        />,
      </div>
    </>
  );

}
