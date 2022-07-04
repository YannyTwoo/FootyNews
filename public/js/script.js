
const whichImages = document.querySelectorAll('.team');
const chosenTeam = document.querySelector('#teamchanger');

setInterval(showTime, 1000);

function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
  
    if (hour > 12) {
      hour -= 12;
      am_pm = " PM";
    }
    if (hour == 0) {
      hr = 12;
      am_pm = " AM";
    }
  
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let currentTime = hour + ":" + min + ":" + sec + am_pm;
  
    document.getElementById("timedate2").innerHTML = currentTime;
  }

document.querySelector('#yet2add').addEventListener('click',(e)=>{
    e.preventDefault();
    alert('This feature is yet to be added')
})
  
  

Array.from(whichImages).forEach((img) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        bod = { "teamname" : img.name}
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bod)
        })
        setTimeout(window.location.reload() , 1000)



        // window.location.reload()


        // chosenTeam.src= img.name + ".png" ;
    })
})
