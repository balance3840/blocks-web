import React, { useRef, useState, useEffect } from "react";

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
import { createTaskComment, deleteTaskComment, editTaskComment, getTask, getTaskComments } from "../../api/task.request";
import { getAuthUser, getUserDisplayName } from "../../utils/misc";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { STREAM_URL } from "../../env";

export default function WorkspaceContainer({ match: { params } }) {
  const { id } = params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [task, setTask] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [initialXml, setInitialXml] = useState('');
  const [loading, setLoading] = useState(true);
  const [blocksRender, setBlocksRender] = useState(0);
  const taskXmlName = `task-${id}-xml`;
  const [videoView, setVideoView] = useState(false);
  const authUser = getAuthUser();

  const simpleWorkspace = useRef();
  const playerRef = useRef();

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
    let code = BlocklyJS.workspaceToCode(
      simpleWorkspace.current.workspace
    );
    if (!code.includes('{')) {
      code = `{\n ${code} }`;
    }
    console.log(code);
    setVideoView(true);
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
    getTask(id).then(response => {
      setTask(response.data);
    });
  }, [])

  useEffect(() => {
    task && setLoading(false);
  }, [task])

  useEffect(() => {
    if (simpleWorkspace.current) {
      simpleWorkspace.current.workspace.addChangeListener(generateXml);
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
      return;
    }
    setBlocksRender(blocksRender + 1);
  }, [blocksRender])

  function backTaskView() {
    setVideoView(false);
    setBlocksRender(blocksRender + 1);
  }

  function renderDefaultContent() {
    return (
      <>
        {task && (
          <>
            <h1 className="mt-3">{task.title}</h1>
            <p>{task.description}</p>
          </>
        )}
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
          <Block type="controls_repeat_ext">
            <Value name="TIMES">
              <Shadow type="math_number">
                <Field name="NUM">10</Field>
              </Shadow>
            </Value>
          </Block>
        </BlocklyComponent>

        <div className="mt-5 mb-5 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={() => generateCode()}>Enviar código</button>
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
                  {comment.user_id === authUser.id && (
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
                    </div>)}
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
      </>
    )
  }

  function renderContent() {
    return videoView ? renderVideoContent() : renderDefaultContent()
  }

  function renderVideoContent() {
    return (
      <>
        <h2 className="mt-4">{task.title}: video en tiempo real del código enviado</h2>
        <div className="media-player mt-4">
          <ReactHlsPlayer
            playerRef={playerRef}
            src={STREAM_URL}
            autoPlay={true}
            controls={true}
            width="100%"
            height="425px"
          />
        </div>
        <div className="d-flex justify-content-center mt-4 mb-5">
          <button className="btn btn-primary" onClick={() => backTaskView()}>Volver a la vista de la tarea</button>
        </div>
      </>
    )
  }

  function renderLoading() {
    return <Loader />
  }

  return (
    loading ? renderLoading() : renderContent()
  );

}
