import React, { useRef, useState, useEffect } from "react";

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
} from "../../components/Blockly";

import BlocklyJS from "blockly/javascript";

import "../../components/blocks/customblocks";
import "../../components/generator/generator";
import { getTaskComments } from "../../api/task.request";
import { getUserDisplayName } from "../../utils/misc";

export default function WorkspaceContainer({ match: { params } }) {

  const { id } = params;
  const [comments, setComments] = useState([]);

  const simpleWorkspace = useRef();

  function generateCode() {
    var code = BlocklyJS.workspaceToCode(
      simpleWorkspace.current.workspace
    );
    console.log(code);
  };

  function saveComment(e) {
    e.preventDefault();
    console.log("SAVING COMMENT");
  }

  useEffect(() => {
    getTaskComments(id).then(response => {
      setComments(response.data);
    });
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
        initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="test_move_forward" x="20" y="20"></block>
<block type="test_wait" x="20" y="47"></block>
<block type="test_move_left" x="20" y="74"></block>
</xml>
      `}
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
      <div style={{ background: 'white', borderRadius: '10px' }}>
        <h2 style={{ background: 'rgba(17, 205, 239, 0.08)', padding: '10px', border: '0.5px solid rgba(0, 0, 0, 0.05)', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>Comentarios</h2>
        <div className="comments" style={{ padding: '10px' }}>
          {comments.map(comment => (
            <div className="comment" style={{ border: '0.5px solid #00000036', padding: '10px' }}>
              <div className="comment-header" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="author-picture"><img alt="Image placeholder" src={`https://ui-avatars.com/api/?background=F89985&color=fff&name=${getUserDisplayName(comment.user)}&size=40`} style={{ borderRadius: '10px' }} /> &nbsp;</div>
                <div className="author-name">{getUserDisplayName(comment.user)}&nbsp;</div>
                <div className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
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
        <form method="get" onSubmit={(e) => saveComment(e)}>
        <div className="form-group">
          <label className="form-control-label">Nuevo comentario</label>
          <textarea rows={4} placeholder="Escribe tu comentario aqui..." className="form-control" name="description" spellCheck="false" defaultValue={""} required={true} />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Insertar</button>
        </div>
        </form>
      </div>
    </>
  );

}
