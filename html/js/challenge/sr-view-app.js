// Generated by CoffeeScript 1.7.1
Serenade.view('app', 'div\n  h2[style="text-align: center"]\n    span[class:text-success=@totalSuccess]\n      @topNumber\n    span.text-success.response[class:show_=@totalSuccess]\n      " YES!"\nform.challengeControl.form-horizontal\n  .form-group\n    label.col-sm-4.control-label[for="left" class:connected-blue=@blueConnected]\n      "Blue Robot"\n    .col-sm-2\n      input.form-control[name="left" binding:change=@leftVal type="text" disabled=@leftDisabled class:disabled=@leftDisabled]\n    .col-sm-6\n      button[event:click=leftClick! class:hidden=@hasRobots]\n        "Blue Robot"\n      span.text-warning.response[class:show_=@leftFailed]\n        "Guess again!"\n      span.text-success.response[class:show_=@leftSuccess]\n        "Success!"\n  .form-group\n    label.col-sm-4.control-label[for="right" class:connected-red=@redConnected]\n      "Red Robot"\n    .col-sm-2\n      input.form-control[name="right" binding:change=@rightVal type="text" disabled=@rightDisabled class:disabled=@rightDisabled]\n    .col-sm-6\n      button[event:click=rightClick! class:hidden=@hasRobots]\n        "Red Robot"\n      span.text-warning.response[class:show_=@rightFailed]\n        "Guess again!"\n      span.text-success.response[class:show_=@rightSuccess]\n        "Success!"\n  .form-group\n    label.col-sm-4.control-label.small[for="start-over"]\n      "New numbers?"\n    .col-sm-4\n      button.form-control[event:click=startOver!]\n        "Start Over"\n  div[style="position:relative; top:2em"]\n    .form-group[style="position:relative; top:2px"]\n      label.col-sm-3.control-label.connected-blue[for="blue-id"]\n        "Blue ID"\n      .col-sm-2[class:has-success=@blueConnected]\n        input.form-control[name="blue-id" type="text" binding:change=@blueId]\n      label.col-sm-3.control-label.connected-red[for="red-id"]\n        "Red ID"\n      .col-sm-2[class:has-success=@redConnected]\n        input.form-control[name="red-id" type="text" binding:change=@redId]\n    .form-group\n      .col-sm-4.col-sm-offset-4\n        button.form-control[event:click=connect!]\n          "Connect"\n    .form-group\n      .col-sm-4.col-sm-offset-4\n        button.form-control[event:click=discon!]\n          "Disconnect"\n    .form-group\n      .col-sm-offset-8.col-sm-2\n        a.btn.btn-primary[href="../index.html?finishedApp=FactoringChallenge"]\n          "finish"');
