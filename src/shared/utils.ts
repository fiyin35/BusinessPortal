


export const handleRequestErrors = (error: any) => {

    if (error.toString().indexOf("'closed' of undefined") > -1) {
        // setTimeout(() => {
        //  window.location.reload();
        // }, 1000);

    }

    // console.log("error text is", error);

    if (error !== undefined && error !== null && error !== "") {
        // if(error!==undefined && error!==null && error.toString().indexOf("'closed' of undefined")===-1){

        if (typeof error.response === "object") {

            // console.log("dsdsdsdsdsdsd---------", error.response.data)
            if (error.response && error.response.data.title !== null && error.response.data.title !== undefined
                && error.response.data.title.toLowerCase().indexOf('one or more validation errors occurred.') > -1) {

                // return error.response.data.title;

                return modelStateErrorHandler(error);
            } else {
                if (error.response.data.message !== null && error.response.data.message !== undefined && error.response.data.message !== "") {
                    return error.response.data.message;
                } else {

                    return "The service is presently unreachable. Please try again later";
                    // if(error.response && error.response.data.traceMessages!==null && error.response.data.traceMessages!==undefined){

                    //     return error.response.data.traceMessages;
                    // }
                }
                // if(error.response.data.traceMessages!==null && error.response.data.traceMessages!==undefined && error.response.data.traceMessages!==""){
                //     return error.response.data.traceMessages;
                // }else{
                //     if(error.response && error.response.data.message!==null && error.response.data.message!==undefined){

                //         return error.response.data.message;
                //     }
                // }
            }

            // if(error.message){
            //     if(error.message==='Request failed with status code 400'){
            //         return "An error occured. Please try again";
            //     }
            //     return error.message;
            // }

            return "Something went wrong. Please try again";
        }

        if (error.toString() === "Error: Network Error") {
            return "Please check your network and try again"
        }

        if (error.data && typeof error.data === "string") {
            if (error.data.indexOf("Bad Request") > -1) {
                return "Something went wrong. Please try again later";
            }
        }



        // return error
        return 'An error occured';
    }


    return "Something went wrong. Please try again";
}

export const modelStateErrorHandler = (error: any) => {
    //console.log("in model state");
    //console.log(error);
    try {

        if (error?.response) {
            if ("errors" in error.response.data && (error.response.data.title !== undefined && error.response.data.title !== "")) {
                if ("errors" in error.response.data && error.response.data.title.toLowerCase().indexOf('one or more validation errors occurred.') > -1) {
                    let message = '';
                    for (let key in error.response.data.errors) {
                        if (error.response.data.errors.hasOwnProperty(key)) {
                            // console.log(key + " -> " + error.errors[key]);
                            if (Object.keys(error.response.data.errors).length > 1) {
                                message += error.response.data.errors[key] + "\n";
                            } else {
                                message += error.response.data.errors[key];
                            }
                        }
                    }
                    return message;
                } else {
                    let message = '';
                }
            }
            // else {
            //     return handleError(error);
            // } //Check for the exact error code to know what to return
        }
        // else {
        //     return handleError(error);
        // }  //Check for the exact error code to know what to return

    } catch (err) {
        // console.log(err);
        return "Error : Something went wrong";
    }

}

export const handleError = (error: any) => {
    //console.log("-----in handle error")
    //console.log(error);
    var message = '';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status >= 500 && error.response.status < 600) {
            message = 'something went wrong, try again please.';
        } else {
            // console.log("----====", typeof error.response.data);
            message = error.response.data.message || error.response.data.Message;
        }

    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log(error.request);
        message = error.message
    } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
        message = error.message;
    }
    return message;
};


export const getDateFromISO = ({ date, returnTime }: { date: any, returnTime?: boolean }) => {
    // if (date === null) return "";
    let toUse = new Date(date),
        year = toUse.getFullYear(),
        month: any = toUse.getMonth() + 1,
        dt: any = toUse.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }


    let convertedDate = `${dt}-${month}-${year}`;
    // let convertedDate = toUse.toUTCString().split(' ').slice(0, 4).join(' ');
    let convertedTime = '';
    if (returnTime === true && date.indexOf('T') === -1) {
        convertedTime = date.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1");
        return convertedTime;
    }
    if (returnTime === true && date.indexOf('T') > -1) {
        convertedTime = date.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1");

        let convertedDateAndTime = `${convertedDate} ${convertedTime}`;
        return convertedDateAndTime;
    }

    return convertedDate;


}

export const accountNumber = (accountNum: string, maxChars: string) => {
    var reg = /^\d+$/;
    let filteredNum = accountNum.replace(/\D/g, '');
    // if(reg.test(accountNum)){
    let maxNoOfChars = (maxChars !== null && maxChars !== undefined) ? parseInt(maxChars) : 10
    if (filteredNum.toString().length <= maxNoOfChars) {
        return filteredNum;
    } else {
        return filteredNum.toString().substr(0, maxNoOfChars);
    }
    // }else{

    //     return "";
    // }
}


export const noWhiteSpaces = (value: string) => {
    let filteredValue = value.trim().replace(/\s/g, '');
    // if(reg.test(accountNum)){
    return filteredValue;
    // if(filteredValue.toString().length<=1){
    //     return filteredValue;
    // }
}



export const allowNumbersOnly = (numbers: string, maxLength: any) => {
    if (numbers !== undefined && numbers !== null) {
        var reg = /^\d+$/;
        let filteredNum = numbers.replace(/\D/g, '');



        // if(maxLength!==null && maxLength!==undefined && typeof maxLength ==="number" && filteredNum.toString().length>maxLength){
        //     // console.log("##",filteredNum.toString().length);
        //     filteredNum = filteredNum.toString().substring(0,maxLength);


        //     return filteredNum;
        // }else{

        //     return filteredNum;
        // }
        // else{
        //     // console.log("++",filteredNum.toString().length)
        // }

        if (typeof maxLength === "number") {
            if (filteredNum.toString().length <= maxLength) {
                return filteredNum;
            } else {
                return filteredNum.toString().substring(0, maxLength);
            }
        } else {
            return filteredNum;
        }





    } else {
        return null;
    }
    // if(reg.test(numbers)){
    //     return numbers;
    // }else{

    //     return "";
    // }
}

export const numberWithoutDecimals = (amount: string) => {
    // let testSequence = /^[0-9.,]+$/;
    // let testSequence = /([0-9]+(\.[0-9]+)?)/;

    // if(amount!==null){
    //     if(amount!==undefined && amount!==''){
    let amountFiltered, splittedDecimal, amountTemp;
    amount = amount.toString().replace(/\-\D/g, '');

    // if(!testSequence.test(amount)){
    //     return "";
    // }
    // return numberProvided.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return parseFloat(numberProvided).toLocaleString(undefined, {maximumFractionDigits:2});

    // if(amount.indexOf(',')>-1){
    amountFiltered = amount.toString().replace(/,/g, '');
    // }


    if ((amountFiltered.match(/\./g) || []).length === 1) {

        if (amountFiltered.indexOf('.') > 0) {
            splittedDecimal = amountFiltered.trim().split('.');

            if (splittedDecimal[1].indexOf('.') > -1) {
                splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
            }

            if (splittedDecimal[0].indexOf('.') > -1) {
                splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
            }

            if (splittedDecimal[1].length > 2) {

                splittedDecimal[1] = splittedDecimal[1].substring(2, 0);
            }

            // if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0'){
            //     splittedDecimal[1] = splittedDecimal[1]+'0';
            // }


            amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return `${amountTemp}.${splittedDecimal[1]}`;
        }
    }
    if ((amountFiltered.match(/\./g) || []).length > 1) {

        var numberParts: string | string[] = amountFiltered.split('.');
        numberParts = numberParts.slice(0, -1).join('') + '.' + numberParts.slice(-1)

        return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }



    return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



    //     }
    // }

    // if(amount===null){
    //     return null;
    // }
}

export const numberWithCommas = (amount:string, isDecimal?:boolean) => {

    // if (amount !== null && amount !== undefined) {
        if (amount !== '') {
            let amountFiltered, splittedDecimal, amountTemp;
            amount = amount.toString().replace(/[^-?^0-9.,]/g, '');

            amountFiltered = amount.toString().replace(/,/g, '');



            if ((amountFiltered.match(/\./g) || []).length === 1) {

                if (amountFiltered.indexOf('.') > 0) {
                    splittedDecimal = amountFiltered.trim().split('.');

                    if (splittedDecimal[1].indexOf('.') > -1) {
                        splittedDecimal[1] = splittedDecimal[1].replace(/./g, '')
                    }

                    if (splittedDecimal[0].indexOf('.') > -1) {
                        splittedDecimal[0] = splittedDecimal[0].replace(/./g, '')
                    }

                    if (splittedDecimal[1].length > 2) {

                        splittedDecimal[1] = splittedDecimal[1].substring(2, 0);
                    }

                    if (splittedDecimal[1].length < 2 && isDecimal === true) {

                        splittedDecimal[1] = splittedDecimal[1] + '0';
                    }

                    // if(splittedDecimal[1].length===1 && splittedDecimal[1]!=='0' && isDecimal===true){
                    //     splittedDecimal[1] = splittedDecimal[1]+'0';
                    // }


                    amountTemp = splittedDecimal[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    return `${amountTemp}.${splittedDecimal[1]}`;
                }
            }

            if ((amountFiltered.match(/\./g) || []).length > 1) {

                var numberParts:string|string[] = amountFiltered.split('.');
                numberParts = numberParts.slice(0, -1).join('') + '.' + numberParts.slice(-1)

                return numberParts.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }

            if (amountFiltered.indexOf('.') === -1 && isDecimal === true) {
                amountFiltered = amountFiltered + '.00';
            }

            return amountFiltered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



        }
        if (amount === '') {
            return "";
        }
    // } else {
    //     return null;
    // }


    // if(amount===null){
    //     return null;
    // }
}










export const getDateInfo = (dateValue: string, returnTime: string): string => {
    let dateString = dateValue.split("T")[0],
        timeIs = dateValue.split("T")[1];
    dateString = new Date(dateString).toUTCString();

    dateString = dateString.split('00').slice(0, 3).join(' ').replace(/:/g, '');
    // if(returnTime){
    //     return `${dateString} ${convertIsoTime(timeIs.split(".")[0])}`
    // }
    return dateString;

}