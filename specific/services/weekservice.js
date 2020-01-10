function getCurrentWeek(){
    return getWeek();
}
function getWeek(weekOffset){
    let currentDate = new Date();
    if(weekOffset){
        currentDate.setDate(currentDate.getTime()+ (7*24*60*60*1000*weekOffset));
    }
    let weekDates = [];

    for(let i=1;i<=7; i++){
        let date = currentDate.getDate() - currentDate.getDay() + i;
        let day = new Date(currentDate.setDate(date))
        weekDates.push(day)
    }

    return weekDates;
}
function getDate(date){
    return getGermanDate(date);
}
function getGermanDate(date){
    let dd = String(date.getDate()).padStart(2,'0');
    let mm = String(date.getMonth()+1).padStart(2,'0');
    let yyyy = date.getFullYear();

    return dd+'.'+mm+'.'+yyyy;
}

module.exports= {getCurrentWeek,getWeek,getDate}