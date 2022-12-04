const numOrEmail = (auth) => {
    // Mail check regular expression
    const mailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Bangladeshi number check regular expression
    const numberCheck = /^\+880\d{10}$/;

    if (mailCheck.test(auth)) {
        return "email";
    }else if(numberCheck.test(auth)){
        return "number";
    }else{
        return null
    }

}

export default numOrEmail