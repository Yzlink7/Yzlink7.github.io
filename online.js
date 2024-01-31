document.addEventListener('DOMContentLoaded', function(){
    
   const websocketClient = new WebSocket('wss://' + 'tictactoelive.com' + '/ws')

  // const websocketClient = new WebSocket('ws://192.168.32.115:12345/')
    const loader = document.getElementById('spinner')
    const loaderText = document.getElementById('spinner text')
    const b = document.getElementById('container')
    const turn = document.getElementById('turn')
    const screen = document.getElementById('body')
    const tiles = Array.from(document.querySelectorAll('.tile'));
    var waiting
    var yourSymbol
    var enemySymbol
    var timer;
    var addTimer;
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const userAction = (tile, index) => {
        if(isValidAction(tile) && waiting == false) {
            tile.innerText = yourSymbol;
            tile.classList.add(`player${yourSymbol}`);
            clearInterval(addTimer)
            websocketClient.send('Finished ' + index)
            waiting = true;
        }


    }

    websocketClient.onopen = function(){

        b.hidden = true
            
    }
    websocketClient.onmessage = function(message){
        if (message.data == 'Connected'){
            loader.remove()
            loaderText.innerHTML = 'Tic Tac Toe'
            document.title = "Tic Tac Toe(Playing...)"
            b.hidden = false
        }
        else if (message.data == 'Play'){
            timer = 0
            waiting = false
            tiles.forEach( (tile, index) => {
                tile.addEventListener('click', () => userAction(tile, index));
            });
            addTimer = setInterval(function() {
                if (!waiting){
                    timer++
                    turn.innerHTML = 'Your turn </br><p style="font-size: 20px; color: red;">' + (60 - timer) + ' seconds left<p>' 
                    if (timer > 59){
                        websocketClient.send('TimeUp')
               yourSymbol = '*'
              enemySymbol = '*'
             message.data = 'eror'
           
                        } 
                }

            }, 1000)
                
        }
        else if (message.data == 'Wait'){
        
            turn.innerHTML = 'enemy turn'
        }
        else if (message.data == 'You X'){

            yourSymbol = 'X'
            enemySymbol = 'O'
        }
        else if (message.data == 'You O'){

            yourSymbol = 'O'
            enemySymbol = 'X'
        }
        else if (message.data == 'Win'){
            turn.hidden =  true
            loaderText.innerHTML = 'You Win'
            tiles.forEach( (tile, index) => {
                tile.hidden = true;
            });
            window.location="win.html"
        }
        else if (message.data == 'Lose'){
            turn.hidden =  true
            tiles.forEach( (tile, index) => {
                tile.hidden = true;
            });
            window.location = "lose.html"
        }
        else if (message.data == 'restart'){
            tiles.forEach( (tile, index) => {
                tile.innerHTML = '';
                tile.classList.remove(`player${enemySymbol}`);
                tile.classList.remove(`player${yourSymbol}`);
            });
            console.log(yourSymbol, "BEFORe")
            if (yourSymbol == 'X'){
                yourSymbol = 'O'
                enemySymbol = 'X'

            } else{
                yourSymbol = 'X'
                enemySymbol = 'O'
            }
            console.log(yourSymbol, "AFTER")
        }
        else{
            console.log(message.data)
            tiles.forEach( (tile, index) => {
                if (index == message.data){
                    tile.innerText = enemySymbol;
                    tile.classList.add(`player${enemySymbol}`);
                }
            });
        }

    }




}, false)