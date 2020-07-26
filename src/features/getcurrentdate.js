export function getCurrentDate(separator=' '){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    if(month==1){
        month="Jan";
    }else if(month==2){
        month="Feb";
    }else if(month==3){
        month="Mar";
    }else if(month==4){
        month="Apr";
    }else if(month==5){
        month="May";
    }
    else if(month==6){
        month="Jun";
    }else if(month==7){
        month="Jul";
    }else if(month==8){
        month="Aug";
    }else if(month==9){
        month="Sep";
    }else if(month==10){
        month="Oct";
    }else if(month==11){
        month="Nov";
    }else{
        month="Dec";
    }

    let year = newDate.getFullYear();
    
     return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`
    
    }