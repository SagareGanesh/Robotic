"use strict";

var map = {
  url:      {keyword: "Open Browser"},
  text:     {keyword: "Input Text",   value: "y"},
  file:     {keyword: "Choose File",  value: "y"},
  button:   {keyword: "Click Button"},
  a:        {keyword: "Click Link"},
  select:   {keyword: "Select From List By Value", value: "y"},
  // radio:    {keyword: "Select Radio Button", value: "y"},
  element_contain: {keyword: "Element Text Should Be", value: "y"},
  //
  load:     {keyword: 'Wait For Condition', value: "return window.document.readystate == 'complete'"},
  default:  {keyword: "Click Element"}
};

var RobotTranslator = {
  generateEvents: function (list, length){
    let events = list.map(this._generatePath);
    if (events.length > length) {
      events = events.splice(0, length);
    }
    return events.join("\n");
  },

  generateFile: function(list) {
    let events = list.map(this._generatePath);
    events = events.reduce((a, b) => { return a + "    " + b + "\n"; }, "");

    return "*** Settings ***" +
      "\nDocumentation     A test suite with a single test for " + list[0].title +
      "\n...               Created by hats' Robotcorder" +
      "\nLibrary           Selenium2Library    timeout=10" +
      "\nSuite Teardown    Close All Browsers" +
      "\n\n*** Variables ***" +
      "\n${BROWSER}    chrome" +
      "\n\n*** Test Cases ***" +
      "\n" + list[0].title + " test" +
      "\n" +
      events;
  },

  _generatePath: function(attr) {
    let type = map[attr.type] || map["default"];
    let  path = type.keyword;

    path += attr.path ? `  ${attr.path}  \${BROWSER}` : '' ;
    path += attr.xpath ? `  ${attr.xpath}` : '' ;
    path += attr.value && type.value ? `  ${attr.value}` : '' ;

    return path;
  }
};
