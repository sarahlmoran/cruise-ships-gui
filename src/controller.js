(function exportController() {
    class Controller {
        constructor(ship) {
            this.ship = ship;
            this.initialiseSea();
            this.headsUpDisplay();
            document.querySelector("#sailbutton").addEventListener('click', () => {
                this.setSail();
            });
        }

        initialiseSea() {
            const backgrounds = ['./images/water0.png', './images/water1.png'];
            let backgroundIndex = 0;
            window.setInterval(() => {
                document.querySelector(
                    '#viewport'
                ).style.backgroundImage = `url('${
                    backgrounds[backgroundIndex % backgrounds.length]
                }')`;
                backgroundIndex += 1;
            }, 1000);
        }

        renderPorts(ports) {
            const portsElement = document.querySelector('#ports');
            portsElement.style.width = '0px';
            ports.forEach((port,index) => {
                const newPortElement = document.createElement('div');

                newPortElement.className = 'port';
                newPortElement.dataset.portName = port.name;
                newPortElement.dataset.portIndex = index;
                portsElement.appendChild(newPortElement);

                const portsElementWidth = parseInt(portsElement.style.width, 10);
                portsElement.style.width = `${portsElementWidth + 256}px`;
            })
        }

        renderShip(){
            const ship = this.ship
            const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
            const shipElement = document.querySelector('#ship');

            shipElement.style.top = `${portElement.offsetTop + 32}px`;
            shipElement.style.left = `${portElement.offsetLeft - 32}px`;
        }

        setSail(){
            const ship = this.ship
            const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const nextPortIndex = currentPortIndex + 1;
            const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);

            if (currentPortIndex === ship.itinerary.ports.length -1){
                return this.renderMessage("You are at the end of your itinerary, please disembark");
            };

            this.renderMessage(`Now departing ${ship.currentPort.name}`);
            
            const shipElement = document.querySelector('#ship');
            const sailing = setInterval(() => {
                const shipLeft = parseInt(shipElement.style.left, 10);
                if(shipLeft === (nextPortElement.offsetLeft - 32)){
                    ship.setSail();
                    ship.dock();
                    clearInterval(sailing);
                    this.renderMessage(`Now arriving ${ship.currentPort.name}`);
                    this.headsUpDisplay();
                }
             
                shipElement.style.left = `${shipLeft + 1}px`;
            }, 5);    
        }

        renderMessage(message){
            const ship = this.ship

            const messageElement = document.createElement('div');
            messageElement.id = 'message';
            messageElement.innerHTML = message;

            const viewPortElement = document.querySelector('#viewport');
            viewPortElement.appendChild(messageElement);
            
            setTimeout( () => {
                viewPortElement.removeChild(messageElement);
            }, 2000);
        }

        headsUpDisplay(){
            if(this.ship.itinerary.ports.length > 0){
                const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
                const nextPortIndex = currentPortIndex + 1;

                let message = `Current Port: ${ship.itinerary.ports[currentPortIndex].name}`;
                if (nextPortIndex < this.ship.itinerary.ports.length){
                    message += `<br>Next Port: ${ship.itinerary.ports[nextPortIndex].name}`;
                } else message = `Current Port: ${ship.itinerary.ports[currentPortIndex].name}<br> Next Port: End of Itinerary`;
                document.getElementById('hud').innerHTML = message;
            }

        }
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
})();
