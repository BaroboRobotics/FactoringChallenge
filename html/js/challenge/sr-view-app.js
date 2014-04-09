// Generated by CoffeeScript 1.7.1
Serenade.view('app', 'div\n  h2[style="text-align: center"]\n    span[class:text-success=@totalSuccess]\n      @topNumber\n    span.text-success.response[class:show_=@totalSuccess]\n      " YES!"\ndiv.challengeControl\n  label[for="left" style="color: blue"]\n    "Blue Robot"\n  input[name="left" binding:change=@leftVal type="text" disabled=@leftDisabled class:disabled=@leftDisabled]\n  button[event:click=leftClick! class:hidden=@hasRobots]\n    "Blue Robot"\n  span.text-warning.response[class:show_=@leftFailed]\n    "Guess again!"\n  span.text-success.response[class:show_=@leftSuccess]\n    "Success!"\n  br\n  label[for="right" style="color: red"]\n    "Red Robot"\n  input[name="right" binding:change=@rightVal type="text" disabled=@rightDisabled class:disabled=@rightDisabled]\n  button[event:click=rightClick! class:hidden=@hasRobots]\n    "Red Robot"\n  span.text-warning.response[class:show_=@rightFailed]\n    "Guess again!"\n  span.text-success.response[class:show_=@rightSuccess]\n    "Success!"\n  br\n  button[event:click=discon]\n    "Disconnect"\n  button[event:click=connect]\n    "Connect"\n  button[event:click=startOver]\n    "Start Over"\n');
