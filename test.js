var isPalindrome = function(x) {
    let num = x.toString();
    let news = "";
    for(let i = num.length; i >= 0; i--) {
        news = news + num.charAt(i);
    }

    if(news === num) {
        return true;
    } else {
        return false;
    }
};

console.log(isPalindrome(121));