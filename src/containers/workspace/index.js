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
    <div>
      <h2>Comentarios</h2>
      <div>
        { comments.map(comment => (
          <p>{comment.comment}</p>
        )) }
      </div>
    </div>
    </>
  );

}
