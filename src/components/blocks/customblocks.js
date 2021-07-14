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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks


import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

var testReactField = {
  "type": "test_react_field",
  "message0": "custom field %1",
  "args0": [
    {
      "type": "field_react_component",
      "name": "FIELD",
      "text": "Click me"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_react_field'] = {
  init: function() {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
  }
};

var reactDateField = {
  "type": "test_react_date_field",
  "message0": "date field %1",
  "args0": [
    {
      "type": "field_react_date",
      "name": "DATE",
      "date": "01/01/2020"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_react_date_field'] = {
  init: function() {
    this.jsonInit(reactDateField);
    this.setStyle('loop_blocks');
  }
};

var reactMoveForwardField = {
  "type": "test_move_forward",
  "message0": "Mover hacia adelante ↑ por %1 segundos",
  "args0": [
    {
      "type": "field_input",
      "name": "SECONDS",
      "text": "20",
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_move_forward'] = {
  init: function() {
    this.jsonInit(reactMoveForwardField);
    this.setStyle('loop_blocks');
  }
};

var reactMoveBackwardsField = {
  "type": "test_move_backwards",
  "message0": "Mover hacia detrás ↓ por %1 segundos",
  "args0": [
    {
      "type": "field_input",
      "name": "SECONDS",
      "text": "20",
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_move_backwards'] = {
  init: function() {
    this.jsonInit(reactMoveBackwardsField);
    this.setStyle('loop_blocks');
  }
};

var reactMoveLeftField = {
  "type": "test_move_left",
  "message0": "Mover hacia la izquierda ← por %1 segundos",
  "args0": [
    {
      "type": "field_input",
      "name": "SECONDS",
      "text": "20",
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_move_left'] = {
  init: function() {
    this.jsonInit(reactMoveLeftField);
    this.setStyle('loop_blocks');
  }
};

var reactMoveRightField = {
  "type": "test_move_right",
  "message0": "Mover hacia la derecha → por %1 segundos",
  "args0": [
    {
      "type": "field_input",
      "name": "SECONDS",
      "text": "20",
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_move_right'] = {
  init: function() {
    this.jsonInit(reactMoveRightField);
    this.setStyle('loop_blocks');
  }
};

var reactWaitField = {
  "type": "test_wait",
  "message0": "Esperar %1 segundo(s)",
  "args0": [
    {
      "type": "field_input",
      "name": "SECONDS",
      "text": "5",
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_wait'] = {
  init: function() {
    this.jsonInit(reactWaitField);
    this.setStyle('loop_blocks');
  }
};