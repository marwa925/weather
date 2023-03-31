var search= document.getElementById("search");
var degreeOne= document.getElementById("degreeOne");
var statusOne= document.getElementById("statusOne");
var imgOne= document.getElementById("imgOne");
var imgTwo= document.getElementById("imgTwo");
var degMin= document.getElementById("degMin");
var degreeTwo= document.getElementById("degreeTwo");
var statusTwo= document.getElementById("statusTwo");
var imgThree= document.getElementById("imgThree");
var degreeThree= document.getElementById("degreeThree");
var minThree= document.getElementById("minThree");
var statusThree= document.getElementById("statusThree");

async function getData(type){
    let httpReq= await fetch(`https://api.weatherapi.com/v1/current.json?key=0b0426bc35ba48e1b6d110807231902&q=${type}`)
    let dataArr= await httpReq.json();
    let name= dataArr.location.name;
    document.getElementById("city").innerHTML=name;
    let status= dataArr.current.condition.text;
    let img=dataArr.current.condition.icon
    imgOne.setAttribute("src",`https:${img}`);
    let temp= dataArr.current.temp_c;
    statusOne.innerHTML= status;
    degreeOne.innerHTML= temp+`<sup>o</sup>c`;
    // console.log(dataArr)
    // console.log(temp)
    
}

getData("cairo");
getDetailsCurr("cairo")
function day(str){
    var days = [ 'Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const d = new Date(str);
    let day = d.getDay();
    let val= days[day]; 
    return val;
    
}
function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString([], { month: 'long' });
}
search.addEventListener("keyup",function(){
    let locType=search.value;
    getData(locType);
    getDetailsCurr(locType);
})

async function getDetailsCurr(type){
    let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0b0426bc35ba48e1b6d110807231902&q=${type}&days=3`)
    let data= await res.json();
    console.log(data);
    let img= data.forecast.forecastday[1].day.condition.icon;
    statusTwo.innerHTML=data.forecast.forecastday[1].day.condition.text;
    degreeTwo.innerHTML=data.forecast.forecastday[1].day.maxtemp_c+`<sup>o</sup>c`;
    degMin.innerHTML=data.forecast.forecastday[1].day.mintemp_c+`<sup>o</sup>c`;
    imgTwo.setAttribute("src",`https:${img}`);
    let date=data.forecast.forecastday[0].date;
    let spli=date.split("-");
    let mon=getMonthName(spli[1]);
    let days=mon+" "+spli[2];
    document.getElementById("monT").innerHTML= spli[2]+" "+mon;
    // console.log(days)
    document.getElementById("dayOne").innerHTML= day(days);
    let date1=data.forecast.forecastday[1].date;
    let spli1=date1.split("-");
    let mon1=getMonthName(spli1[1]);
    let days1=mon1+" "+spli1[2];
    document.getElementById("dayTwo").innerHTML= day(days1);
    let date2=data.forecast.forecastday[2].date;
    let spli2=date2.split("-");
    let mon2=getMonthName(spli2[1]);
    let days2=mon2+" "+spli2[2];
    document.getElementById("dayThree").innerHTML= day(days2);
    let img1= data.forecast.forecastday[2].day.condition.icon;
    imgThree.setAttribute("src",`https:${img1}`);
    degreeThree.innerHTML=data.forecast.forecastday[2].day.maxtemp_c+`<sup>o</sup>c`;
    minThree.innerHTML=data.forecast.forecastday[2].day.mintemp_c+`<sup>o</sup>c`;
    statusThree.innerHTML=data.forecast.forecastday[2].day.condition.text;
}


