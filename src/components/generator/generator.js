/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['test_react_field'] = function (block) {
    return 'console.log(\'custom block\');\n';
};

Blockly.JavaScript['test_react_date_field'] = function (block) {
    return 'console.log(' + block.getField('DATE').getText() + ');\n';
};

Blockly.JavaScript['test_move_forward'] = function (block) {
    //return 'console.log(' + block.getField('STEPS').getText() + ');\n';
    return `"UP": ${block.getField('SECONDS').getText()},\n`;
};

Blockly.JavaScript['test_move_backwards'] = function (block) {
    return `"DOWN": ${block.getField('SECONDS').getText()},\n`;
};

Blockly.JavaScript['test_move_left'] = function (block) {
    return `"LEFT": ${block.getField('SECONDS').getText()},\n`;
};

Blockly.JavaScript['test_move_right'] = function (block) {
    return `"MOVE_RIGHT": ${block.getField('SECONDS').getText()},\n`;
};

Blockly.JavaScript['test_wait'] = function (block) {
    return `"WAIT": ${block.getField('SECONDS').getText()},\n`;
};

Blockly.JavaScript['controls_repeat_ext'] = function (block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  var code = '';
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.JavaScript.nameDB_.getDistinctName(
        'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += `{
      "loop": {
          "times": ${endVar}
          actions: [
              ${branch}
          ]
      }
  }`;
  return code;
};